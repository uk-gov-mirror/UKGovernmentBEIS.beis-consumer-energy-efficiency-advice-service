package uk.gov.beis.dceas.controller;


import com.google.common.io.Resources;
import lombok.Builder;
import lombok.Value;
import org.apache.commons.collections4.ListUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.context.SpringWebContext;
import org.xhtmlrenderer.pdf.ITextRenderer;
import uk.gov.beis.dceas.service.MeasuresDataService;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;

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

    public EnergySavingPlanController(
            ServletContext servletContext,
            ApplicationContext applicationContext,
            SpringTemplateEngine templateEngine,
            MeasuresDataService measuresDataService) {
        this.servletContext = servletContext;
        this.applicationContext = applicationContext;
        this.templateEngine = templateEngine;
        this.measuresDataService = measuresDataService;
    }

    /**
     * @param recommendationIds the list of Recommendations that are included in the plan.
     *
     *                          Recommendations can be Grants, like "cold-weather-payments"
     *
     *                          or BRE meaures like "High performance external doors" with id "X"
     *
     *                          or our measures like "One degree reduction" with id "one_degree_reduction"
     *
     *                          See EnergyEfficiencyRecommendation.fromMeasure
     *                          and EnergyEfficiencyRecommendation.fromNationalGrant
     *
     *
     *                          qqqqqqq re-create client-side logic?
     *                          qqq or allow clients to email any toss as PDF?
     *
     *                          qqq do some of each -- post the slug id, instaed...
     */
    @PostMapping("download")
    public void downloadPlan(
            @RequestBody DownloadPlanRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse response,
            final Locale locale)
            throws Exception {

        /**
         *
         qq  angular => thymeleaf

         *ngIf="x" => th:if="${x}"
         "===" => ==
         [x]=y => th:attr="x=#{y}"
         *ngFor="let x of xs" => th:each="x : ${y}"

         *ngFor="step of recommendation.steps; let i = index"
         th:each="step,iterStat : ${recommendation.steps}"  , use iterStat.index

         && => &amp;&amp;

         x.length => x.size()

         th:if="localAuthorityGrants &amp;&amp; localAuthorityGrants.length > 0"
         th:if="${localAuthorityGrants?.size() > 0}"

         {{recommendations.length}}
         th:inline="text" ;; [[${recommendations.length}]]

         */

        // https://stackoverflow.com/questions/17953829/with-flying-saucer-how-do-i-generate-a-pdf-with-a-page-number-and-page-total-on


        // TODO:BEIS-209 test hostname in cloud
        URI requestUri = new URI(httpRequest.getRequestURI());
        String userSiteBaseUrl = requestUri.getScheme() + "://" + requestUri.getAuthority();

        SpringWebContext templateContext = new SpringWebContext(
                httpRequest,
                response,
                servletContext,
                locale,
                new HashMap<>(),
                applicationContext);

        loadDisplayData(
                templateContext,
                request,
                userSiteBaseUrl);

        // We render the entire template to a String in memory, then parse that String as XML.
        // In theory, we might be able to pipe the output from Thymeleaf directly into an
        // XML tree, but that would be fiddly and might risk deadlock, so we haven't done so.
        String xml = templateEngine.process("energySavingPlan/plan", templateContext);

        String baseUrl = Resources.getResource("templates/energySavingPlan/plan.html")
                .toString()
                .replaceFirst("plan.html$", "");

        ITextRenderer renderer = new ITextRenderer();
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
            DownloadPlanRequest request,
            String userSiteBaseUrl) throws Exception {

        Map<String, Map<String, Object>> measuresBySlug = measuresDataService.getMeasuresBySlug();

        List<EnergyEfficiencyRecommendation> recommendations = request.recommendations.stream()
                .map(recommendation -> {
                    if (!isNullOrEmpty(recommendation.measureSlug)) {
                        Map<String, Object> measure = measuresBySlug.get(recommendation.measureSlug);

                        // qq grants, ECO HHCRO Social EFG
                        return EnergyEfficiencyRecommendation.fromMeasure(
                                recommendation,
                                measure,
                                userSiteBaseUrl);

                    } else if (!isNullOrEmpty(recommendation.grantSlug)) {
                        throw new RuntimeException("qq");
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
        List<SelectedEnergyEfficiencyRecommendation> recommendations;
        Double potentialScore;
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

        public Double investmentPounds;
        public Double lifetimeYears;
        public Double costSavingPoundsPerYear;
        public Double energySavingKwhPerYear;
        public String iconPath;
        public Integer tags;
    }

    /**
     * This is the server-side version of the ts class "EnergyEfficiencyRecommendation"
     * that we use to render a plan PDF
     */
    @Value
    @Builder
    private static class EnergyEfficiencyRecommendation {

        Double investmentPounds;
        Double lifetimeYears;
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
        public static EnergyEfficiencyRecommendation fromMeasure(
                SelectedEnergyEfficiencyRecommendation recommendation,
                Map<String, Object> measure,
                String userSiteBaseUrl) {

            Map<String, Object> acfFields = (Map<String, Object>) measure.get("acf");

            Object grant = null; //qq

            List<RecommendationStep> measureSteps = getAcfList(acfFields.get("steps")).stream()
                    .map(step -> RecommendationStep.fromWordpress(step, userSiteBaseUrl))
                    .collect(toList());
            List<RecommendationStep> grantSteps = grant == null
                    ? emptyList()
                    : emptyList(); // qqqq

            List<RecommendationStep> steps = ListUtils.union(measureSteps, grantSteps);

            return EnergyEfficiencyRecommendation.builder()
                    .investmentPounds(recommendation.investmentPounds)
                    .lifetimeYears(recommendation.lifetimeYears)
                    .costSavingPoundsPerYear(recommendation.costSavingPoundsPerYear)
                    .energySavingKwhPerYear(recommendation.energySavingKwhPerYear)
                    .readMoreRoute(
                            userSiteBaseUrl + "/measures/" + urlEncode(recommendation.measureSlug))
                    .headline((String) acfFields.get("headline"))
                    .summary((String) acfFields.get("summary"))
                    .whatItIs((String) acfFields.get("what_it_is"))
                    .isItRightForMe((String) acfFields.get("is_it_right_for_me"))
                    .iconPath(recommendation.iconPath)
                    .tags(recommendation.tags)
                    // TODO:BEIS-309 grant
                    .advantages(getAcfList(acfFields.get("advantages"))
                            .stream()
                            .map(a -> (String) a.get("advantage"))
                            .collect(toList()))
                    .steps(steps)
                    .recommendationID(recommendation.measureSlug)
                    .measureCode((String) acfFields.get("measure_code"))
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

        @Value
        @Builder
        static class Link {
            String buttonText;
            LinkProps linkProps;

            public static Link fromWordpress(Map<String, Object> link, String userSiteBaseUrl) {
                return Link.builder()
                        .buttonText((String) link.get("button_text"))
                        .linkProps(LinkProps.getRouteForPageFromUrl(
                                (String) link.get("link_url"),
                                userSiteBaseUrl))
                        .build();
            }

            @Value
            static class LinkProps {
                String route;
                boolean isRelativeURL;

                public static LinkProps getRouteForPageFromUrl(String link_url, String userSiteBaseUrl) {
                    if (null == link_url) {
                        return new LinkProps(null, false);
                    }
                    if (link_url.startsWith("/")) {
                        return new LinkProps(
                                userSiteBaseUrl + link_url,
                                true);
                    }
                    return new LinkProps(
                            link_url,
                            false);
                }
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
}
