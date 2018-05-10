package uk.gov.beis.dceas.controller;

import org.apache.commons.io.FilenameUtils;
import org.junit.Test;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

public class IndexControllerTest {


    /**
     * In order to get a path to appear inside the SPA, it must be mapped by
     * the index() route on IndexController.
     *
     * This must include, at minimum, all routes mapped by Angular.
     *
     * It might be nicer if we just mapped everything outside /dist/ and /api/,
     * but see comments on index()
     */
    @Test
    public void testAllAngularRoutesAreMappedByIndex() throws Exception {
        List<String> javaRoutes = parseJavaIndexRoutes();
        List<String> angularRoutes = parseAngularRoutes();

        List<String> angularRoutesInJavaStyle = convertAngularRouteToJavaStyle(angularRoutes);

        assertThat(javaRoutes).containsAll(angularRoutesInJavaStyle);
    }

    private List<String> convertAngularRouteToJavaStyle(List<String> angularRoutes) {
        Pattern pathFirstSegPat = Pattern.compile("([\\w-]+)(/.*)?");

        return angularRoutes.stream()
                .map(path -> {
                    if ("".equals(path) || "**".equals(path)) {
                        return "/";
                    } else {
                        Matcher matcher = pathFirstSegPat.matcher(path);
                        assertThat(matcher.matches())
                                .withFailMessage("Unexpected path format: '" + path + "'")
                                .isTrue();
                        return "/" + matcher.group(1) + "/**";
                    }
                })
                .collect(toList());
    }

    private List<String> parseAngularRoutes() throws Exception {
        List<String> routingJsLines;
        try {
            routingJsLines = Files.readAllLines(
                    new File("../angular/src/app/app-routing.module.ts").toPath());
        } catch (NoSuchFileException e) {
            throw new Exception(
                    "CWD is " + new File(".").getAbsolutePath(),
                    e);
        }

        Pattern pathLinePatt = Pattern.compile("path: ['\"](.*)['\"],");

        List<String> paths = new ArrayList<>();
        boolean hasSeenRoutesJsonLiteralStart = false;
        boolean hasSeenRoutesJsonLiteralEnd = false;
        for (String line : routingJsLines) {
            if (!hasSeenRoutesJsonLiteralStart) {
                if ("const routes: Routes = [".equals(line)) {
                    hasSeenRoutesJsonLiteralStart = true;
                }
            } else {
                line = line.trim();

                if ("];".equals(line)) {
                    hasSeenRoutesJsonLiteralEnd = true;
                    break;
                } else if (line.startsWith("path: ")) {
                    Matcher matcher = pathLinePatt.matcher(line);
                    assertThat(matcher.matches())
                            .withFailMessage("Unexpected line format: '" + line + "'")
                            .isTrue();
                    paths.add(matcher.group(1));
                }
            }
        }
        assertThat(hasSeenRoutesJsonLiteralStart).isTrue();
        assertThat(hasSeenRoutesJsonLiteralEnd).isTrue();

        return paths;
    }

    private List<String> parseJavaIndexRoutes() throws Exception {
        RequestMapping requestMapping = IndexController.class
                .getMethod("index", Model.class, HttpServletRequest.class)
                .getAnnotation(RequestMapping.class);

        return asList(requestMapping.value());
    }

    /**
     * SVGs shouldn't contain a title tag (as it confuses screen readers) or
     * id attributes (as they cause invalid HTML if the image is used multiple times).
     */
    @Test
    public void testNoTitleOrIdInSvgs() throws Exception {
        Pattern titlePattern = Pattern.compile("<title[^>]*>");
        Pattern idPattern = Pattern.compile("\\bid=\"[^\"]\"");

        Files.walk(new File("../angular/src/assets/images").toPath())
                .filter(p -> FilenameUtils.getExtension(p.toString()).equals("svg"))
                .forEach(p -> {
                    String contents;
                    try {
                        contents = String.join(" ", Files.readAllLines(p));
                    } catch (IOException e) {
                        fail("Error reading file: '" + p + "'");
                        return;
                    }

                    Matcher titleMatcher = titlePattern.matcher(contents);
                    assertThat(titleMatcher.find())
                            .withFailMessage("Unexpected '<title>' tag in: '" + p + "'")
                            .isFalse();

                    Matcher idMatcher = idPattern.matcher(contents);
                    assertThat(idMatcher.find())
                            .withFailMessage("Unexpected 'id' attribute: '" + p + "'")
                            .isFalse();
                });
    }
}
