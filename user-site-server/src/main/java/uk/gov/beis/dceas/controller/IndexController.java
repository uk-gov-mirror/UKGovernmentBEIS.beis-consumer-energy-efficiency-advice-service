package uk.gov.beis.dceas.controller;

import com.google.common.collect.ImmutableMap;
import com.google.common.io.Resources;
import lombok.experimental.var;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.jar.Attributes;
import java.util.jar.JarFile;
import java.util.jar.Manifest;
import java.util.stream.Stream;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * A simple controller to configure and serve the index html page, which will in turn
 * load the frontend JS bundle.
 */
@Controller
public class IndexController {
    private static final Map<String, String> redirects = ImmutableMap.<String, String>builder()
            .put("/measures/meta_solar_water_heating", "/measures/meta_solar_thermal")
            .put("/measures/meta_wood_pellets_boiler", "/measures/meta_biomass_pellet_boiler")
            .put("/green-homes-grant/questionnaire", "/pages/green-homes-grant")
            .build();

    private final Logger log = LoggerFactory.getLogger(getClass());
    // This is coupled with ACCEPTED_COOKIES in app.component.ts
    private static final String ACCEPTED_COOKIES = "acceptedCookiePolicy";

    @Value("${dceas.publicRootUrl}")
    private String publicRootUrl;
    @Value("${dceas.apiRoot}")
    private String apiRoot;
    @Value("${dceas.staticRoot}")
    private String staticRoot;
    @Value("${vcap.services.google.analytics.credentials.id}")
    private String gaId;
    @Value("${vcap.services.dceas-user-site.config.credentials.phone-number}")
    private String phoneNumber;
    @Value("${vcap.application.space_name}")
    private String spaceName;
    @Value("${vcap.services.google.maps.credentials.apiKey}")
    private String googleCloudPlatformApiKey;

    private final Environment environment;
    private final String angularHeadContent;
    private final String angularBodyContent;
    private final Attributes buildAttributes;

    @Autowired
    public IndexController(
            Environment environment) throws IOException {

        this.environment = environment;
        buildAttributes = getBuildAttributes(environment);

        // We read the "dist" index.html from Angular, and inject it into our
        // index page, to use things like Angular's content hash stamping etc.
        URL indexResource = getClass().getResource("/public/dist/index.html");
        if (indexResource != null) {
            String angularIndexFileContent = Resources.toString(
                indexResource,
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
     * This left in for testing, as it can be hard
     * to trigger a server-side error otherwise
     */
    @GetMapping("/testError")
    public void testError() {
        throw new RuntimeException("Test error");
    }

    /**
     * The homepage for the user SPA.
     *
     * See comments in `app-routing.module.ts`
     *
     * All paths which correspond to pages in the Angular app should be added here.
     * (The unit test, IndexControllerTest, checks this mapping)
     *
     * We also render this endpoint as a custom 404 page, so that browser clients
     * will see a pretty 404 page (Angular renders a "page not found" message).
     * However, we still need this big list of paths here, so that we can distinguish
     * between "200 OK" and "404 Not Found" status codes, even though the same body
     * is returned in both cases. The status code is important for programmatic clients,
     * such as AJAX fetches.
     *
     * See https://stackoverflow.com/a/28633189/8261
     */
    @RequestMapping(value = {
        "/",
        "/energy-efficiency/**",
        "/grant-eligibility/**",
        "/green-homes-grant/**",
        "/eco-self-referral/**",
        "/grants/**",
        "/boiler/**",
        "/minimum-energy-efficiency-standards/**",
        "/admin/**",
        "/forbidden/**",
        "/measures/**",
        "/your-home/**",
        "/eco-suppliers/**",
        "/pages/**",
        "/landlord-obligations/**",
        "/certified-repairers/**",
        "/page-not-created/**",
        "/about-this-site/**",
        "/simple-savings/**",
        "/installer-search/**",
        "/search/**",
        "/privacy/**",
    },
        method = GET)
    public String index(Model model, HttpServletRequest request) {
        String path = request.getRequestURI();

        if (redirects.containsKey(path)) {
            request.setAttribute(View.RESPONSE_STATUS_ATTRIBUTE, HttpStatus.MOVED_PERMANENTLY);
            return "redirect:" + redirects.get(path);
        }

        model.addAttribute("publicRootUrl", publicRootUrl);
        model.addAttribute("apiRoot", apiRoot);
        model.addAttribute("staticRoot", staticRoot);
        model.addAttribute("gaId", gaId);
        model.addAttribute("phoneNumber", phoneNumber);
        model.addAttribute("springProfiles", environment.getActiveProfiles());
        model.addAttribute("spaceName", spaceName);
        model.addAttribute("angularHeadContent", angularHeadContent);
        model.addAttribute("angularBodyContent", angularBodyContent);
        model.addAttribute("googleCloudPlatformApiKey", googleCloudPlatformApiKey);

        Cookie[] cookies = request.getCookies();

        Stream<Cookie> cookiesStream = (cookies != null)
                ? Stream.of(cookies)
                : Stream.empty();

        boolean acceptCookies = cookiesStream
                .filter(c -> c.getName().equals(ACCEPTED_COOKIES))
                .findFirst()
                .map(c -> c.getValue().equals("true"))
                .orElse(false);

        model.addAttribute("acceptCookies", acceptCookies);

        String savings = getSavingsFromShareLink(request);
        model.addAttribute("savings", savings);

        model.addAttribute("buildTimestamp",
            buildAttributes.getValue("Build-Timestamp"));
        model.addAttribute("buildGitCommit",
            buildAttributes.getValue("Git-Commit"));
        model.addAttribute("buildUrl",
            buildAttributes.getValue("Build-Url"));
        model.addAttribute("buildNumber",
            buildAttributes.getValue("Build-Number"));

        return "index";
    }

    private String getSavingsFromShareLink(HttpServletRequest request) {
        String shareParameter = request.getParameter("share");
        if (shareParameter == null) {
            return null;
        }
        int savings;
        try {
            savings = Integer.parseInt(shareParameter);
        } catch (NumberFormatException e) {
            return null;
        }
        return savings > 0 && savings < 10000 ? "£" + savings : null;
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
