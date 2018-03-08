package uk.gov.beis.dceas.controller;

import com.google.common.collect.Iterables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
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
    @Value("${dceas.apiRoot}")
    private String apiRoot;

    @Value("${dceas.staticRoot}")
    private String staticRoot;

    private final Environment environment;

    @Autowired
    public IndexController(Environment environment) {
        this.environment = environment;
    }

    @RequestMapping(value = {
        "/",
        "/js/**"  // TODO:BEIS-157 tidy up js routing for prettier URLs
    },
        method = GET)
    public String index(Model model) throws IOException {
        model.addAttribute("apiRoot", apiRoot);
        model.addAttribute("staticRoot", staticRoot);
        model.addAttribute("environment", getEnvName());

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
        if ("dev".equals(getEnvName())) {
            return new Attributes();
        }

        // Can't use normal resource loading in Spring Boot
        // https://stackoverflow.com/questions/32293962/how-to-read-my-meta-inf-manifest-mf-file-in-a-spring-boot-app
        String jarClassUrl = getClass().getProtectionDomain().getCodeSource().getLocation().toString();
        String jarUrl = jarClassUrl.substring(0, jarClassUrl.indexOf('!'));
        URL mfUrl = new URL(jarUrl + "!/" + JarFile.MANIFEST_NAME);

        try (InputStream mfStream = mfUrl.openStream()) {
            Manifest manifest = new Manifest(mfStream);
            return manifest.getMainAttributes();
        }
    }
}
