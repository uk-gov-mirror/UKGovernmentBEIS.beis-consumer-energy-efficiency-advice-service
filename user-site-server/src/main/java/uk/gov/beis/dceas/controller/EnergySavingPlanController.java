package uk.gov.beis.dceas.controller;


import com.google.common.io.Resources;
import lombok.Builder;
import lombok.Value;
import org.apache.commons.collections4.ListUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.context.SpringWebContext;
import org.xhtmlrenderer.pdf.ITextRenderer;
import uk.gov.beis.dceas.api.NationalGrant;
import uk.gov.beis.dceas.service.MeasuresDataService;
import uk.gov.beis.dceas.service.NationalGrantsService;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.ObjectUtils.defaultIfNull;

/**
 * Allows downloading or emailing your energy saving plan
 */
@RestController
@RequestMapping("/api/plan")
public class EnergySavingPlanController {

    private final Logger log = LoggerFactory.getLogger(getClass());
    private final ServletContext servletContext;
    private final ApplicationContext applicationContext;
    private final SpringTemplateEngine templateEngine;
    private final MeasuresDataService measuresDataService;
    private final NationalGrantsService nationalGrantsService;
    private final String publicRootUrl;

    public EnergySavingPlanController(
            ServletContext servletContext,
            ApplicationContext applicationContext,
            SpringTemplateEngine templateEngine,
            MeasuresDataService measuresDataService,
            NationalGrantsService nationalGrantsService,
            @org.springframework.beans.factory.annotation.Value("${dceas.publicRootUrl}")
                    String publicRootUrl) {
        this.servletContext = servletContext;
        this.applicationContext = applicationContext;
        this.templateEngine = templateEngine;
        this.measuresDataService = measuresDataService;
        this.nationalGrantsService = nationalGrantsService;
        this.publicRootUrl = publicRootUrl;
    }

    /**
     * @param request info from the client app about the plan.
     *
     *                This includes the list of Recommendations that are included in the plan.
     *
     *                Recommendations can be Grants, like "cold-weather-payments"
     *
     *                or BRE meaures like "High performance external doors" with id "X"
     *
     *                or our measures like "One degree reduction" with id "one_degree_reduction"
     *
     *                See EnergyEfficiencyRecommendation.fromMeasure
     *                and EnergyEfficiencyRecommendation.fromNationalGrant
     */
    @PostMapping("download")
    public void downloadPlan(
            @Valid @RequestParam("planInfo") DownloadPlanRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse response,
            final Locale locale)
            throws Exception {

        // Could add page numbers and header/footer, if desired:
        // https://stackoverflow.com/questions/17953829/with-flying-saucer-how-do-i-generate-a-pdf-with-a-page-number-and-page-total-on

        SpringWebContext templateContext = new SpringWebContext(
                httpRequest,
                response,
                servletContext,
                locale,
                new HashMap<>(),
                applicationContext);

        loadDisplayData(
                templateContext,
                request);

        // We render the entire template to a String in memory, then parse that String as XML.
        // In theory, we might be able to pipe the output from Thymeleaf directly into an
        // XML tree, but that would be fiddly and might risk deadlock, so we haven't done so.
        String xml = templateEngine.process("energySavingPlan/plan", templateContext);

        String baseUrl = Resources.getResource("templates/energySavingPlan/plan.html")
                .toString()
                .replaceFirst("plan.html$", "");

        ITextRenderer renderer = new ITextRenderer();

        renderer.getFontResolver().addFont(
                Resources.getResource("templates/energySavingPlan/GothamBook.ttf").toString(),
                true);
        renderer.getFontResolver().addFont(
                Resources.getResource("templates/energySavingPlan/GothamLight.ttf").toString(),
                true);

        renderer.setDocumentFromString(xml, baseUrl);
        renderer.layout();

        // After this point, it's too late to send a pretty error response.
        // Exceptions above (like invalid XML) will still generate the standard error page.
        response.setContentType("application/pdf");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=\"Each Home Counts - Energy Saving Plan.pdf\"");
        try (ServletOutputStream out = response.getOutputStream()) {
            renderer.createPDF(out);
        }
    }

    /**
     * Keep this in sync with recommendations.service.ts `refreshAllRecommendations`
     */
    private void loadDisplayData(
            SpringWebContext templateContext,
            DownloadPlanRequest request) throws Exception {

        Map<String, Map<String, Object>> measuresBySlug = measuresDataService.getMeasuresBySlug();

        List<EnergyEfficiencyRecommendation> recommendations = request.recommendations.stream()
                .map(recommendation -> {
                    if (!isNullOrEmpty(recommendation.measureSlug)) {
                        Map<String, Object> measure = measuresBySlug.get(recommendation.measureSlug);

                        return EnergyEfficiencyRecommendation.fromMeasure(
                                recommendation,
                                measure,
                                publicRootUrl,
                                nationalGrantsService);

                    } else if (!isNullOrEmpty(recommendation.grantSlug)) {
                        return EnergyEfficiencyRecommendation.fromNationalGrant(
                                recommendation,
                                nationalGrantsService.get(recommendation.grantSlug), publicRootUrl);
                    } else {
                        throw new IllegalArgumentException(
                                "One of `measureSlug` or `grantSlug` must be set for each recommendation");
                    }
                })
                .collect(toList());

        templateContext.setVariable("recommendations", recommendations);

        Double totalInvestment = recommendations.stream()
                .mapToDouble(r -> r.investmentPounds).sum();

        templateContext.setVariable("roundedTotalInvestmentRequired",
                roundAndFormatCostValue(totalInvestment));

        boolean showMonthlySavings = request.tenureType != 0;
        templateContext.setVariable("showMonthlySavings", showMonthlySavings);

        Double totalSavings = recommendations.stream()
                .mapToDouble(r -> showMonthlySavings
                        ? (r.costSavingPoundsPerYear / 12.0)
                        : r.costSavingPoundsPerYear)
                .sum();

        templateContext.setVariable("roundedTotalSavings",
                roundAndFormatCostValue(totalSavings));

        templateContext.setVariable("potentialScore", request.potentialScore);
    }

    @Value
    @Builder
    public static class DownloadPlanRequest {
        @NotNull
        List<SelectedEnergyEfficiencyRecommendation> recommendations;
        @NotNull
        Double potentialScore;
        @NotNull
        Integer tenureType;
    }

    /**
     * This is a cut-down version of the ts class "EnergyEfficiencyRecommendation"
     * that the client sends to us to request a plan PDF
     *
     * We don't want the client to post us all the WP content text since
     * a) it's a waste of bandwidth, might be very slow for mobile clients
     * b) it would allow vandals to generate branded PDFs with junk content
     *
     * but we do need more than just the recommendationID, since there is a fair
     * bit of client-side logic that we don't want to reproduce
     */
    @Value
    public static class SelectedEnergyEfficiencyRecommendation {
        /**
         * Null if this is a Grant
         */
        String measureSlug;
        /**
         * Null if this is a Measure
         */
        String grantSlug;
        /**
         * Null if not a measure or if the measure has no grant
         */
        String nationalGrantForMeasureId;

        Double investmentPounds;
        /**
         * If a measure, this is `costSavingPoundsPerYear`
         * If a grant, this is `calculator.getStandaloneAnnualPaymentPounds`
         */
        Double costSavingPoundsPerYear;
    }

    /**
     * This is the server-side version of the ts class "EnergyEfficiencyRecommendation"
     * that we use to render a plan PDF
     */
    @Value
    @Builder
    private static class EnergyEfficiencyRecommendation {

        Double investmentPounds;
        Double costSavingPoundsPerYear;
        Double energySavingKwhPerYear;
        String readMoreRoute;
        String headline;
        String summary;
        String whatItIs;
        String isItRightForMe;
        String iconPath;
        Integer tags;
        //        NationalGrantForMeasure grant;
        List<String> advantages;
        List<RecommendationStep> steps;
        String recommendationID;
        String measureCode;

        /**
         * Keep this in sync with energy-efficiency-recommendation.ts `fromMeasure`
         */
        static EnergyEfficiencyRecommendation fromMeasure(
                SelectedEnergyEfficiencyRecommendation recommendation,
                Map<String, Object> measure,
                String userSiteBaseUrl,
                NationalGrantsService nationalGrantsService) {

            Map<String, Object> acfFields = (Map<String, Object>) measure.get("acf");

            List<RecommendationStep> grantSteps;
            if (isNullOrEmpty(recommendation.nationalGrantForMeasureId)) {
                grantSteps = emptyList();
            } else {
                NationalGrant grant = nationalGrantsService.get(recommendation.nationalGrantForMeasureId);
                grantSteps = grant.getSteps().stream()
                        .map(step -> RecommendationStep.fromGrant(step, userSiteBaseUrl))
                        .collect(toList());
            }

            List<RecommendationStep> measureSteps = getAcfList(acfFields.get("steps")).stream()
                    .map(step -> RecommendationStep.fromWordpress(step, userSiteBaseUrl))
                    .collect(toList());

            List<RecommendationStep> steps = ListUtils.union(measureSteps, grantSteps);

            return EnergyEfficiencyRecommendation.builder()
                    .investmentPounds(recommendation.investmentPounds)
                    .costSavingPoundsPerYear(recommendation.costSavingPoundsPerYear)
                    .readMoreRoute(
                            userSiteBaseUrl + "/measures/" + urlEncode(recommendation.measureSlug))
                    .headline((String) acfFields.get("headline"))
                    .summary((String) acfFields.get("summary"))
                    .whatItIs((String) acfFields.get("what_it_is"))
                    .isItRightForMe((String) acfFields.get("is_it_right_for_me"))
                    .advantages(getAcfList(acfFields.get("advantages"))
                            .stream()
                            .map(a -> (String) a.get("advantage"))
                            .collect(toList()))
                    .steps(steps)
                    .recommendationID(recommendation.measureSlug)
                    .measureCode((String) acfFields.get("measure_code"))
                    .build();
        }

        /**
         * Keep this in sync with energy-efficiency-recommendation.ts `fromNationalGrant`
         */
        static EnergyEfficiencyRecommendation fromNationalGrant(
                SelectedEnergyEfficiencyRecommendation recommendation,
                NationalGrant grant,
                String userSiteBaseUrl) {

            return EnergyEfficiencyRecommendation.builder()
                    .investmentPounds(0.0)
                    .costSavingPoundsPerYear(
                            defaultIfNull(recommendation.costSavingPoundsPerYear, 0.0))
                    .readMoreRoute(
                            makeUrlAbsolute(grant.getFindOutMoreLink(), userSiteBaseUrl))
                    .headline(grant.getHeading())
                    .summary(grant.getDescription())
                    .whatItIs(null)
                    .isItRightForMe(null)
                    .advantages(emptyList())
                    .steps(grant.getSteps().stream()
                            .map(step -> RecommendationStep.fromGrant(step, userSiteBaseUrl))
                            .collect(toList()))
                    .recommendationID(grant.getSlug())
                    .build();
        }

        public String getRoundedInvestment() {
            return roundAndFormatCostValue(investmentPounds);
        }

        public String getRoundedSavings(boolean showMonthlySavings) {
            return roundAndFormatCostValue(showMonthlySavings
                    ? (costSavingPoundsPerYear / 12.0)
                    : costSavingPoundsPerYear);
        }
    }

    private static String urlEncode(String val) {
        try {
            return URLEncoder.encode(val, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    @SuppressWarnings("unchecked")
    private static List<Map<String, Object>> getAcfList(Object val) {
        if (val != null && val instanceof List<?>) {
            return (List<Map<String, Object>>) val;
        }
        return emptyList();
    }

    /**
     * Keep this in sync with recommendation-step.ts
     */
    @Value
    @Builder
    private static class RecommendationStep {
        String headline;
        String description;
        String readMore;
        List<Link> moreInfoLinks;

        static RecommendationStep fromWordpress(Map<String, Object> step, String userSiteBaseUrl) {
            List<Link> moreInfoLinks = getAcfList(step.get("more_info_links")).stream()
                    .map(link -> Link.fromWordpress(link, userSiteBaseUrl))
                    .collect(toList());

            return RecommendationStep.builder()
                    .headline((String) step.get("headline"))
                    .description((String) step.get("description"))
                    .readMore((String) step.get("read_more"))
                    .moreInfoLinks(moreInfoLinks)
                    .build();
        }

        static RecommendationStep fromGrant(NationalGrant.Step step, String userSiteBaseUrl) {
            return RecommendationStep.builder()
                    .headline(step.getHeadline())
                    .description(step.getDescription())
                    .readMore(step.getReadMore())
                    .moreInfoLinks(step.getMoreInfoLinks().stream()
                            .map(link -> Link.fromGrant(link, userSiteBaseUrl))
                            .collect(toList()))
                    .build();
        }

        @Value
        @Builder
        static class Link {
            String buttonText;
            String url;

            static Link fromWordpress(Map<String, Object> link, String userSiteBaseUrl) {
                return Link.builder()
                        .buttonText((String) link.get("button_text"))
                        .url(makeUrlAbsolute((String) link.get("link_url"), userSiteBaseUrl))
                        .build();
            }

            static Link fromGrant(NationalGrant.Link link, String userSiteBaseUrl) {
                return Link.builder()
                        .buttonText(link.getButtonText())
                        .url(makeUrlAbsolute(link.getLinkUrl(), userSiteBaseUrl))
                        .build();
            }
        }
    }

    /**
     * Keep this in sync with RoundingService.ts
     */
    private static String roundAndFormatCostValue(double input) {
        if (input > 5.0) {
            return String.format("£%.0f", 5.0 * Math.round(input / 5.0));
        } else if (input > 1) {
            return String.format("£%.0f", input);
        } else {
            return "-";
        }
    }

    private static String makeUrlAbsolute(String linkUrl, String userSiteBaseUrl) {
        if (isNullOrEmpty(linkUrl)) {
            return null;
        }
        if (linkUrl.startsWith("/")) {
            return userSiteBaseUrl + linkUrl;
        }
        return linkUrl;
    }
}
