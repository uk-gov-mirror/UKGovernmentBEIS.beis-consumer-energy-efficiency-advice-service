package uk.gov.beis.dceas.controller;

import com.google.common.collect.Iterables;
import com.google.common.io.Resources;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import uk.gov.beis.dceas.service.IpValidationService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.jar.Attributes;
import java.util.jar.JarFile;
import java.util.jar.Manifest;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * A simple controller to configure and serve the index html page, which will in turn
 * load the frontend JS bundle.
 */
@Controller
public class IndexController {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Value("${dceas.apiRoot}")
    private String apiRoot;

    @Value("${dceas.staticRoot}")
    private String staticRoot;

    private final Environment environment;
    private final IpValidationService ipValidationService;

    private final String angularHeadContent;

    private final String angularBodyContent;

    @Autowired
    public IndexController(Environment environment, IpValidationService ipValidationService) throws IOException {
        // TODO:BEIS-196 env is "dev" on CF at the moment, fix or rename
        this.environment = environment;
        this.ipValidationService = ipValidationService;

        // We read the "dist" index.html from Angular, and inject it into our
        // index page, to use things like Angular's content hash stamping etc.
        URL indexResouce = getClass().getResource("/public/dist/index.html");
        if (indexResouce != null) {
            String angularIndexFileContent = Resources.toString(
                indexResouce,
                StandardCharsets.UTF_8);

            Document document = Jsoup.parse(angularIndexFileContent);

            angularHeadContent = document.head().html();
            angularBodyContent = document.body().html();
        } else {
            log.error("The angular files were not found in the resources dir. "
                + "The application will not work!");
            angularHeadContent = "";
            angularBodyContent = "INTERNAL ERROR - javascript files not built correctly";
        }
    }

    @RequestMapping(value = {
        "/",
        "/js/**"  // TODO:BEIS-196 tidy up js routing for prettier URLs
    },
        method = GET)
    public String index(Model model, HttpServletRequest request) throws IOException {
        model.addAttribute("apiRoot", apiRoot);
        model.addAttribute("staticRoot", staticRoot);
        model.addAttribute("environment", getEnvName());
        model.addAttribute("hasAdminIpAddress", ipValidationService.requestIsInIpWhitelist(request));
        model.addAttribute("angularHeadContent", angularHeadContent);
        model.addAttribute("angularBodyContent", angularBodyContent);

        Attributes attributes = getBuildAttributes();
        model.addAttribute("buildTimestamp",
            attributes.getValue("Build-Timestamp"));
        model.addAttribute("buildGitCommit",
            attributes.getValue("Git-Commit"));
        model.addAttribute("buildJenkinsUrl",
            attributes.getValue("Jenkins-Build-Url"));
        model.addAttribute("buildJenkinsNumber",
            attributes.getValue("Jenkins-Build-Number"));

        return "index";
    }

    public String getEnvName() {
        return Iterables.getFirst(
            Arrays.asList(environment.getActiveProfiles()),
            "UNKNOWN ENV");
    }

    private Attributes getBuildAttributes() throws IOException {
        InputStream mfStream = null;
        try {
            // The cloud foundry Java buildpack unzips the JAR, so normal classloading
            // should work
            mfStream = this.getClass().getClassLoader().getResourceAsStream("META-INF/MANIFEST.MF");

            if (mfStream == null) {
                // Can't use normal resource loading in Spring Boot
                // https://stackoverflow.com/questions/32293962/how-to-read-my-meta-inf-manifest-mf-file-in-a-spring-boot-app
                String jarClassUrl = getClass().getProtectionDomain().getCodeSource().getLocation().toString();
                int jarFileSelectorStartIndex = jarClassUrl.indexOf('!');
                if (jarFileSelectorStartIndex < 0) {
                    // Not running inside a JAR
                    return new Attributes();
                }
                String jarUrl = jarClassUrl.substring(0, jarFileSelectorStartIndex);
                URL mfUrl = new URL(jarUrl + "!/" + JarFile.MANIFEST_NAME);

                mfStream = mfUrl.openStream();
            }

            Manifest manifest = new Manifest(mfStream);
            return manifest.getMainAttributes();
        } finally {
            if (mfStream != null) {
                mfStream.close();
            }
        }
    }
}
