package uk.gov.beis.dceas.controller;

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
    @Value("${vcap.services.google.analytics.credentials.id}")
    private String gaId;

    private final Environment environment;
    private final IpValidationService ipValidationService;
    private final String angularHeadContent;
    private final String angularBodyContent;
    private final Attributes buildAttributes;

    @Autowired
    public IndexController(
        Environment environment,
        IpValidationService ipValidationService) throws IOException {

        this.environment = environment;
        buildAttributes = getBuildAttributes(environment);
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
            angularBodyContent = "INTERNAL ERROR - javascript files not built correctly.<p>" +
                "On a dev machine, ensure that you have 'ng build --watch' running, then " +
                "right click on the project in IntelliJ, click 'synchronise', then re-build " +
                "and re-launch the Java app.";
        }
    }

    /**
     * The homepage for the user SPA.
     *
     * See comments in `app-routing.module.ts`
     *
     * All paths which correspond to pages in the Angular app should be added here.
     * (The main alternative to this would be to show the index page as a custom
     * 404 page, see e.g. https://stackoverflow.com/a/28633189/8261 )
     * (The unit test, IndexControllerTest, checks this mapping)
     */
    @RequestMapping(value = {
        "/",
        "/energy-efficiency/**",
        "/grants/**",
        "/boiler/**",
        "/minimum-energy-efficiency-standards/**",
        "/admin/**",
        "/forbidden/**",
        "/measures/**",
        "/your-home/**",
        "/eco-suppliers/**",
        "/pages/**",
        "/boiler-grants/**",
        "/landlord-obligations/**",
        "/certified-repairers/**",
        "/page-not-created/**",
        "/about-this-site/**",
        "/simple-savings/**",
        "/installer-search/**",
    },
        method = GET)
    public String index(Model model, HttpServletRequest request) throws IOException {
        model.addAttribute("apiRoot", apiRoot);
        model.addAttribute("staticRoot", staticRoot);
        model.addAttribute("gaId", gaId);
        model.addAttribute("environment", environment.getActiveProfiles());
        model.addAttribute("hasAdminIpAddress", ipValidationService.requestIsInIpWhitelist(request));
        model.addAttribute("angularHeadContent", angularHeadContent);
        model.addAttribute("angularBodyContent", angularBodyContent);

        model.addAttribute("buildTimestamp",
            buildAttributes.getValue("Build-Timestamp"));
        model.addAttribute("buildGitCommit",
            buildAttributes.getValue("Git-Commit"));
        model.addAttribute("buildUrl",
            buildAttributes.getValue("Build-Url"));
        model.addAttribute("buildNumber",
            buildAttributes.getValue("Build-Number"));

        model.addAttribute("host", request.getServerName());

        return "index";
    }

    private Attributes getBuildAttributes(Environment environment) throws IOException {
        if (environment.acceptsProfiles("dev")) {
            return new Attributes();
        }

        InputStream mfStream = null;
        try {
            URL mfUrl;

            // Can't use normal resource loading in Spring Boot
            // https://stackoverflow.com/questions/32293962/how-to-read-my-meta-inf-manifest-mf-file-in-a-spring-boot-app
            String jarClassUrl = getClass().getProtectionDomain().getCodeSource().getLocation().toString();
            int jarFileSelectorStartIndex = jarClassUrl.indexOf('!');
            if (jarFileSelectorStartIndex > 0) {
                String jarUrl = jarClassUrl.substring(0, jarFileSelectorStartIndex);
                mfUrl = new URL(jarUrl + "!/" + JarFile.MANIFEST_NAME);
            } else if (jarClassUrl.equals("file:/home/vcap/app/BOOT-INF/classes/")) {
                // The Cloud Foundry Java bootpack seems to part-unpack our JAR, and I
                // can't see how to get to our MANIFEST via the classpath.
                mfUrl = new URL("file:/home/vcap/app/META-INF/MANIFEST.MF");
            } else {
                log.error("Failed to find our MANIFEST.MF. jarClassUrl = " + jarClassUrl);
                return new Attributes();
            }

            log.info("Using MANIFEST.MF from: " + mfUrl);
            mfStream = mfUrl.openStream();
            Manifest manifest = new Manifest(mfStream);
            return manifest.getMainAttributes();
        } finally {
            if (mfStream != null) {
                mfStream.close();
            }
        }
    }
}
