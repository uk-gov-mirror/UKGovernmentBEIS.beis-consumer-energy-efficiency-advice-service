package uk.gov.beis.dceas.controller;


import lombok.Value;
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

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

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

    public EnergySavingPlanController(
            ServletContext servletContext,
            ApplicationContext applicationContext,
            SpringTemplateEngine templateEngine) {
        this.servletContext = servletContext;
        this.applicationContext = applicationContext;
        this.templateEngine = templateEngine;
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
     * qqqqqqq re-create client-side logic?
*                          qqq or allow clients to email any toss as PDF?
     *
     * qqq do some of each -- post the slug id, instaed...
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

         */

        SpringWebContext templateContext = new SpringWebContext(
                httpRequest,
                response,
                servletContext,
                locale,
                new HashMap<>(),
                applicationContext);
        templateContext.setVariable("recommendations", request.recommendations);
        String xml = templateEngine.process("energySavingPlan/plan", templateContext);

        ITextRenderer renderer = new ITextRenderer();
        // qq could use stream-to-stream
        renderer.setDocumentFromString(xml);
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

    @Value
    public static class DownloadPlanRequest {
        List<SelectedEnergyEfficiencyRecommendation> recommendations;
    }

    /**
     * This is a cut-down version of the ts class "EnergyEfficiencyRecommendation"
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
        String recommendationID;
    }
}
