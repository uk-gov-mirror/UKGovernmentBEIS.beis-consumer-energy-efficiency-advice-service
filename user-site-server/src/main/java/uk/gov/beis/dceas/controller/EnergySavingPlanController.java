package uk.gov.beis.dceas.controller;


import com.google.common.io.Resources;
import lombok.Builder;
import lombok.Value;
import org.apache.commons.collections4.ListUtils;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.context.SpringWebContext;
import org.xhtmlrenderer.pdf.ITextRenderer;
import uk.gov.beis.dceas.api.NationalGrant;
import uk.gov.beis.dceas.api.PdfLandlordRecommendationParams;
import uk.gov.beis.dceas.api.PdfRecommendationParams;
import uk.gov.beis.dceas.api.PdfUserRecommendationParams;
import uk.gov.beis.dceas.data.EnergyEfficiencyRecommendationTag;
import uk.gov.beis.dceas.service.InstallerSearchService;
import uk.gov.beis.dceas.service.MeasuresDataService;
import uk.gov.beis.dceas.service.NationalGrantsService;

import javax.mail.internet.MimeMessage;
import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.ObjectUtils.defaultIfNull;
import static uk.gov.beis.dceas.data.EnergyEfficiencyRecommendationTag.GHG_INELIGIBLE;
import static uk.gov.beis.dceas.data.EnergyEfficiencyRecommendationTag.GHG_PRIMARY;
import static uk.gov.beis.dceas.data.EnergyEfficiencyRecommendationTag.GHG_SECONDARY;
import static uk.gov.beis.dceas.data.EnergyEfficiencyRecommendationTag.RECOMMENDATION_TAGS_BY_JSON_NAME;

/**
 * Allows downloading or emailing your energy saving plan
 */
@RestController
@RequestMapping("/api/plan")
public class EnergySavingPlanController {

    private static final double POUND_ROUNDING = 5.0;

    private final Logger log = LoggerFactory.getLogger(getClass());
    private final ServletContext servletContext;
    private final ApplicationContext applicationContext;
    private final SpringTemplateEngine templateEngine;
    private final MeasuresDataService measuresDataService;
    private final NationalGrantsService nationalGrantsService;
    private final String publicRootUrl;
    private final JavaMailSender emailSender;
    private final String trustmarkInstallersUrl;
    private final InstallerSearchService installerSearchService;

    public EnergySavingPlanController(
            ServletContext servletContext,
            ApplicationContext applicationContext,
            SpringTemplateEngine templateEngine,
            MeasuresDataService measuresDataService,
            NationalGrantsService nationalGrantsService,
            @org.springframework.beans.factory.annotation.Value("${dceas.publicRootUrl}")
                    String publicRootUrl,
            @org.springframework.beans.factory.annotation.Value("${vcap.services.trustMark.credentials.allInstallers.url}")
                    String trustmarkInstallersUrl,
            JavaMailSender emailSender,
            InstallerSearchService installerSearchService
    ) {
        this.servletContext = servletContext;
        this.applicationContext = applicationContext;
        this.templateEngine = templateEngine;
        this.measuresDataService = measuresDataService;
        this.nationalGrantsService = nationalGrantsService;
        this.publicRootUrl = publicRootUrl;
        this.emailSender = emailSender;
        this.installerSearchService = installerSearchService;
        this.trustmarkInstallersUrl = trustmarkInstallersUrl;
    }

    /**
     * Renders the client's Plan to a PDF and emails it to the requested address.
     *
     * See comments on {@link #downloadUserPlan}
     */
    @PostMapping("email")
    public void emailPlan(
            @Valid @RequestBody EmailRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse response,
            final Locale locale)
            throws Exception {

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(request.emailAddress);
        helper.setFrom("no-reply@simpleenergyadvice.org.uk");
        helper.setSubject("Simple Energy Advice - Energy Saving Plan");

        helper.setText("Please find attached your Energy Saving Plan.\n" +
                "\n" +
                "This email was requested by a user at https://www.simpleenergyadvice.org.uk/\n" +
                "\n" +
                "Thanks for using the website.\n" +
                "\n" +
                "Yours,\n" +
                "\n" +
                "The Simple Energy Advice team");

        ByteArrayOutputStream pdfBuffer = new ByteArrayOutputStream();

        PlanInfo planInfo = request.getPlanInfo();
        PdfUserRecommendationParams pdfUserRecommendationParams = new PdfUserRecommendationParams(
                planInfo.getRecommendations(),
                planInfo.getTenureType(),
                planInfo.postcode,
                planInfo.shouldShowGhgContext
        );

        writePlanToOutputStream(pdfUserRecommendationParams, pdfBuffer, httpRequest, response, locale);

        helper.addAttachment(
                "Simple Energy Advice - Energy Saving Plan.pdf",
                new ByteArrayResource(pdfBuffer.toByteArray()),
                "application/pdf");

        emailSender.send(message);
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
    public void downloadUserPlan(
            @Valid @RequestParam("planInfo") PlanInfo request,
            @Valid @RequestParam(value = "forLandlord", defaultValue = "false") boolean forLandlord,
            HttpServletRequest httpRequest,
            HttpServletResponse response,
            final Locale locale)
            throws Exception {

        PdfRecommendationParams pdfRecommendationParams = forLandlord
                ? new PdfLandlordRecommendationParams(request.getRecommendations(), request.tenureType, request.postcode)
                : new PdfUserRecommendationParams(request.getRecommendations(), request.tenureType, request.postcode, request.shouldShowGhgContext);

        downloadPlan(pdfRecommendationParams, httpRequest, response, locale);
    }

    private void downloadPlan(
            PdfRecommendationParams pdfRecommendationParams,
            HttpServletRequest httpRequest,
            HttpServletResponse response,
            Locale locale
    ) throws Exception {
        response.setContentType("application/pdf");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=\"Simple Energy Advice - " + pdfRecommendationParams.getFileDescription() + ".pdf\"");
        try (ServletOutputStream out = response.getOutputStream()) {
            writePlanToOutputStream(pdfRecommendationParams, out, httpRequest, response, locale);
        }
    }

    private void writePlanToOutputStream(
            PdfRecommendationParams pdfRecommendationParams,
            OutputStream out,
            HttpServletRequest httpRequest,
            HttpServletResponse response,
            Locale locale)
            throws Exception {

        SpringWebContext templateContext = new SpringWebContext(
                httpRequest,
                response,
                servletContext,
                locale,
                new HashMap<>(),
                applicationContext);

        loadDisplayData(
                templateContext,
                pdfRecommendationParams
        );

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

        renderer.createPDF(out);
    }

    private static boolean isGhgEligible(EnergyEfficiencyRecommendation recommendation) {
        return recommendation.getTags().stream().anyMatch(tag -> tag == GHG_PRIMARY || tag == GHG_SECONDARY);
    }
    /**
     * Keep this in sync with recommendations.service.ts `getRecommendationsContent`
     */
    private void loadDisplayData(
            SpringWebContext templateContext,
            PdfRecommendationParams pdfRecommendationParams
    ) throws Exception {

        Map<String, Map<String, Object>> measuresBySlug = measuresDataService.getMeasuresBySlug();

        List<EnergyEfficiencyRecommendation> recommendations = pdfRecommendationParams.getRecommendations().stream()
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

        templateContext.setVariable("title", pdfRecommendationParams.getTitle());
        templateContext.setVariable("subheading", pdfRecommendationParams.getSubheading());

        templateContext.setVariable("recommendations", recommendations);
        templateContext.setVariable("ghgInstallers", findGhgInstallers(pdfRecommendationParams.getPostcode(), recommendations));
        templateContext.setVariable("allInstallersUrls", getTrustmarkInstallerListUrls(pdfRecommendationParams.getPostcode(), recommendations));
        templateContext.setVariable("isGhgEligible", pdfRecommendationParams.shouldShowGhgContext() && recommendations.stream().anyMatch(EnergySavingPlanController::isGhgEligible));
        templateContext.setVariable("ghgEligiblePrimary", GHG_PRIMARY);
        templateContext.setVariable("ghgEligibleSecondary", GHG_SECONDARY);
        templateContext.setVariable("ghgIneligible", GHG_INELIGIBLE);
        templateContext.setVariable("shouldShowGhgContext", pdfRecommendationParams.shouldShowGhgContext());

        double totalInvestment = recommendations.stream()
                .mapToDouble(r -> {
                    if (r.installationCost != null && r.installationCost.getEstimatedInvestment() != null) {
                        return r.installationCost.getEstimatedInvestment();
                    }
                    else {
                        return 0.0;
                    }
                }).sum();

        templateContext.setVariable("roundedTotalInvestmentRequired",
                roundAndFormatCostValue(totalInvestment));

        boolean showMonthlySavings = pdfRecommendationParams.getShowMonthlySavings();
        templateContext.setVariable("showMonthlySavings", showMonthlySavings);

        double minimumSavings = recommendations.stream()
                .mapToDouble(r -> showMonthlySavings
                        ? (r.minimumCostSavingPoundsPerYear / 12.0)
                        : r.minimumCostSavingPoundsPerYear)
                .sum();

        double maximumSavings = recommendations.stream()
                .mapToDouble(r -> showMonthlySavings
                        ? (r.maximumCostSavingPoundsPerYear / 12.0)
                        : r.maximumCostSavingPoundsPerYear)
                .sum();

        String totalSavingsDisplay = roundAndFormatCostValueRange(minimumSavings, maximumSavings);

        templateContext.setVariable("totalSavingsDisplay", totalSavingsDisplay);
    }

    private Map<String, Optional<String>> getTrustmarkInstallerListUrls(
            String postcode,
            List<EnergyEfficiencyRecommendation> recommendations
    ) {
        return recommendations.stream()
                .collect(Collectors.toMap(
                        EnergyEfficiencyRecommendation::getRecommendationID,
                        recommendation -> {
                            if (isGhgEligible(recommendation)) {
                                return Optional.of(getTrustmarkInstallerListUrl(postcode, recommendation.trustMarkTradeCodes));
                            }
                            return Optional.empty();
                        }
                ));
    }

    private String getTrustmarkInstallerListUrl(String postcode, List<String> tradeCodes) {
        return UriComponentsBuilder.fromHttpUrl(trustmarkInstallersUrl)
                .queryParam("postCode", installerSearchService.formatPostcode(postcode))
                // The TrustMark link supports a query parameter of up to 6 trade codes
                .queryParam(
                        "tradeCode",
                        tradeCodes.stream()
                                .filter(c -> !isNullOrEmpty(c))
                                .limit(6)
                                .collect(Collectors.joining(",")))
                .toUriString();
    }

    private Map<String, List<InstallerSearchService.TrustMarkInstaller>> findGhgInstallers(
            String postcode,
            List<EnergyEfficiencyRecommendation> recommendations
    ) {
        return recommendations.stream()
                .collect(Collectors.toMap(
                        EnergyEfficiencyRecommendation::getRecommendationID,
                        recommendation -> {
                            if (isGhgEligible(recommendation)) {
                                try {
                                    return installerSearchService.findInstallers(
                                            postcode,
                                            recommendation.getTrustMarkTradeCodes().toArray(new String[0]))
                                            .getData()
                                            .stream()
                                            .limit(3)
                                            .collect(toList());
                                } catch (Exception e) {
                                    return emptyList();
                                }
                            } else {
                                return emptyList();
                            }
                        }));
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
     * Keep this in sync with EnergyEfficiencyRecommendationService.ts
     */
    private static String roundAndFormatCostValue(double input) {
        double roundedValue = roundCostValue(input);
        return formatCostValueAndNotDisplayZeroValue(roundedValue);
    }

    /**
     * Keep this in sync with EnergyEfficiencyRecommendationService.ts
     */
    private static String roundAndFormatCostValueRange(double minimumInput, double maximumInput) {
        double roundedMinimumInput = roundCostValue(minimumInput);
        double roundedMaximumInput = roundCostValue(maximumInput);

        return roundedMinimumInput == roundedMaximumInput
                ? formatCostValueAndNotDisplayZeroValue(roundedMaximumInput)
                : formatCostValue(roundedMinimumInput) + " - " + formatCostValue(roundedMaximumInput);
    }

    /**
     * Keep this in sync with EnergyEfficiencyRecommendationService.ts
     */
    private static double roundCostValue(double input) {
        double roundingValue = input > POUND_ROUNDING
                ? POUND_ROUNDING
                : 1;
        return Math.round(input / roundingValue) * roundingValue;
    }

    /**
     * Keep this in sync with EnergyEfficiencyRecommendationService.ts
     */
    private static String formatCostValueAndNotDisplayZeroValue(double input) {
        return input > 0
                ? formatCostValue(input)
                : "-";
    }

    private static String formatCostValue(double input) {
        return String.format("£%.0f", input);
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

    private static List<EnergyEfficiencyRecommendationTag> getTagsForMeasure(List<String> measureTags) {
        List<EnergyEfficiencyRecommendationTag> tags = measureTags.stream()
                .map(RECOMMENDATION_TAGS_BY_JSON_NAME::get)
                .filter(Objects::nonNull)
                .collect(toList());

        if (!tags.contains(GHG_PRIMARY) && !tags.contains(GHG_SECONDARY)) {
            tags.add(GHG_INELIGIBLE);
        }

        return tags;
    }

    @Value
    @Builder
    @SuppressWarnings("checkstyle:visibilitymodifier")
    public static class EmailRequest {
        @NotNull
        @Valid
        PlanInfo planInfo;
        @NotNull
        @NotBlank
        @Email
        String emailAddress;
    }

    /**
     * The info posted by the client to allow us to reconstruct their plan
     * server-side.
     */
    @Value
    @Builder
    @SuppressWarnings("checkstyle:visibilitymodifier")
    public static class PlanInfo {
        @NotNull
        List<SelectedEnergyEfficiencyRecommendation> recommendations;
        @NotNull
        Integer tenureType;
        @NotNull
        String postcode;
        @NotNull
        boolean shouldShowGhgContext;
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
    @SuppressWarnings("checkstyle:visibilitymodifier")
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

        InstallationCost installationCost;
        /**
         * If a measure, this is `costSavingPoundsPerYear`, adjusted by 'uncertainty'
         * If a grant, this is `calculator.getStandaloneAnnualPaymentPounds` adjusted by 'uncertainty'
         */
        Double minimumCostSavingPoundsPerYear;
        Double maximumCostSavingPoundsPerYear;
    }

    @Value
    @Builder
    public static class InstallationCost {
        Double estimatedInvestment;
        Range installationCostRange;
    }

    @Value
    public static class Range {
        Double min;
        Double max;
        boolean isBreRange;
    }

    /**
     * This is the server-side version of the ts class "EnergyEfficiencyRecommendation"
     * that we use to render a plan PDF
     */
    @Value
    @Builder
    @SuppressWarnings("checkstyle:visibilitymodifier")
    private static class EnergyEfficiencyRecommendation {

        Double minimumCostSavingPoundsPerYear;
        Double maximumCostSavingPoundsPerYear;
        Double energySavingKwhPerYear;
        String readMoreRoute;
        String headline;
        String summary;
        String whatItIs;
        String isItRightForMe;
        String iconPath;
        List<EnergyEfficiencyRecommendationTag> tags;
        List<String> advantages;
        List<RecommendationStep> steps;
        String recommendationID;
        String measureCode;
        List<String> trustMarkTradeCodes;
        InstallationCost installationCost;

        /**
         * Keep this in sync with energy-efficiency-recommendation.ts `fromMeasure`
         */
        static EnergyEfficiencyRecommendation fromMeasure(
                SelectedEnergyEfficiencyRecommendation recommendation,
                Map<String, Object> measure,
                String userSiteBaseUrl,
                NationalGrantsService nationalGrantsService) {

            Map<String, Object> acfFields = (Map<String, Object>) measure.get("acf");

            List<EnergyEfficiencyRecommendationTag> tags = getTagsForMeasure((List<String>) acfFields.get("tags"));

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

            List<String> tradeCodes = getAcfList(acfFields.get("trustmark_trade_codes")).stream()
                    .map(ttc -> (String) ttc.get("trade_code"))
                    .collect(toList());

            return EnergyEfficiencyRecommendation.builder()
                    .tags(tags)
                    .installationCost(recommendation.installationCost)
                    .minimumCostSavingPoundsPerYear(recommendation.minimumCostSavingPoundsPerYear)
                    .maximumCostSavingPoundsPerYear(recommendation.maximumCostSavingPoundsPerYear)
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
                    .trustMarkTradeCodes(tradeCodes)
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
                    .tags(singletonList(EnergyEfficiencyRecommendationTag.GRANT))
                    .installationCost(InstallationCost.builder().estimatedInvestment(0.0).build())
                    .minimumCostSavingPoundsPerYear(
                            defaultIfNull(recommendation.minimumCostSavingPoundsPerYear, 0.0))
                    .maximumCostSavingPoundsPerYear(
                            defaultIfNull(recommendation.maximumCostSavingPoundsPerYear, 0.0))
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
                    .trustMarkTradeCodes(emptyList())
                    .build();
        }

        public String getInvestmentRequiredString() {
            if (installationCost != null) {
                Range range = installationCost.getInstallationCostRange();
                Double investment = installationCost.getEstimatedInvestment();
                if (range != null && range.getMin() != null && range.getMax() != null && !range.isBreRange()) {
                    return getRoundedInvestmentRange();
                } else if (investment != null && investment >= 0) {
                    return getRoundedInvestment();
                }
            }
            return "-";
        }

        public String getRoundedInvestment() {
            return roundAndFormatCostValue(installationCost.getEstimatedInvestment());
        }

        public String getRoundedInvestmentRange() {
            return roundAndFormatCostValueRange(installationCost.getInstallationCostRange().getMin(), installationCost.getInstallationCostRange().getMax());
        }

        public String getRoundedSavings(boolean showMonthlySavings) {
            double minimumCostSaving = showMonthlySavings
                    ? (minimumCostSavingPoundsPerYear / 12.0)
                    : minimumCostSavingPoundsPerYear;

            double maximumCostSaving = showMonthlySavings
                    ? (maximumCostSavingPoundsPerYear / 12.0)
                    : maximumCostSavingPoundsPerYear;
            return roundAndFormatCostValueRange(minimumCostSaving, maximumCostSaving);
        }
    }

    /**
     * Keep this in sync with recommendation-step.ts
     */
    @Value
    @Builder
    @SuppressWarnings("checkstyle:visibilitymodifier")
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
        @SuppressWarnings("checkstyle:visibilitymodifier")
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
}
