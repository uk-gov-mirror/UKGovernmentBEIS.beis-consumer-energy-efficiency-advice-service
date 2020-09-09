package uk.gov.beis.dceas.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableList;
import com.google.common.io.Files;
import com.google.common.io.Resources;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.client.RestTemplate;
import uk.gov.beis.dceas.api.NationalGrant;
import uk.gov.beis.dceas.controller.EnergySavingPlanController.PlanInfo;
import uk.gov.beis.dceas.controller.EnergySavingPlanController.InstallationCost;
import uk.gov.beis.dceas.controller.EnergySavingPlanController.Range;
import uk.gov.beis.dceas.controller.EnergySavingPlanController.SelectedEnergyEfficiencyRecommendation;
import uk.gov.beis.dceas.service.InstallerSearchService;
import uk.gov.beis.dceas.service.MeasuresDataService;
import uk.gov.beis.dceas.service.NationalGrantsService;
import uk.gov.beis.dceas.spring.DownloadPlanRequestParameterConverter;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(EnergySavingPlanController.class)
public class EnergySavingPlanControllerTest {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * To get a Measure with a child grant from the questionnaire, for comparison, the
     * easiest is "eco-hhcro-help-to-heat".
     * answer:
     * - n19 5jx, 2 tremlett
     * - own home
     * - 1930 - 1949
     * - tick all benefits
     * - £1000 / pa income
     */
    @Test
    @edu.umd.cs.findbugs.annotations.SuppressWarnings(
            value = "RV_RETURN_VALUE_IGNORED_BAD_PRACTICE",
            justification = "Both `true` and `false` might indicate success from mkdirs()")
    public void testDownloadPlan() throws Exception {
        PlanInfo requestBody = PlanInfo.builder()
                .recommendations(
                        ImmutableList.of(
                                // A measure
                                new SelectedEnergyEfficiencyRecommendation(
                                        "meta_wall_insulation_brick_age_band_a_d",
                                        null,
                                        null,
                                        new InstallationCost(9000.0, new Range(9000.0, 9000.0, true)),
                                        130.01,
                                        130.01),
                                // A measure
                                new SelectedEnergyEfficiencyRecommendation(
                                        "meta_one_degree_reduction",
                                        null,
                                        null,
                                        new InstallationCost(0.0, new Range(0.0, 0.0, true)),
                                        43.86,
                                        43.86),
                                // A measure with an attached grant:
                                new SelectedEnergyEfficiencyRecommendation(
                                        "meta_loft_insulation",
                                        null,
                                        "eco-hhcro-help-to-heat",
                                        new InstallationCost(225.0, new Range(225.0, 225.0, true)),
                                        378.24,
                                        378.24),
                                // A grant
                                new SelectedEnergyEfficiencyRecommendation(
                                        null,
                                        "cold-weather-payments",
                                        null,
                                        new InstallationCost(0.0, new Range(0.0, 0.0, true)),
                                        null,
                                        null)))
                .tenureType(0)
                .build();

        String formBody = EntityUtils.toString(new UrlEncodedFormEntity(ImmutableList.of(
                new BasicNameValuePair(
                        "planInfo",
                        objectMapper.writeValueAsString(requestBody)
                ),
                new BasicNameValuePair(
                        "forLandlord",
                        objectMapper.writeValueAsString(false)
                )
        )));
        MvcResult mvcResult = mvc
                .perform(
                        post("/api/plan/download")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .content(formBody)
                                .with(user("username").password("password")))
                .andExpect(status().isOk())
                .andReturn();

        String dirName = "build/test-results/";
        new File(dirName).mkdirs();
        File file = new File(dirName + getClass().getName() + ".pdf");
        Files.write(
                mvcResult.getResponse().getContentAsByteArray(),
                file);

        log.info("Example Plan PDF at: " + file.getAbsolutePath());

        // No assertions here; just that the above rendered without exceptions
        // is all we can really test here.
    }

    @TestConfiguration
    public static class TestConfig {
        @Bean
        @Primary
        public MeasuresDataService mockMeasuresDataService(ObjectMapper objectMapper) throws IOException {
            List<?> measuresJson = objectMapper.readValue(
                    Resources.getResource(
                            "uk/gov/beis/dceas/service/measures-response.json"),
                    List.class);

            RestTemplate httpClient = mock(RestTemplate.class);
            when(httpClient.getForObject(anyString(), eq(List.class)))
                    .thenReturn(measuresJson);

            RestTemplateBuilder restTemplateBuilder = mock(RestTemplateBuilder.class);
            when(restTemplateBuilder.build()).thenReturn(httpClient);

            return new MeasuresDataService(
                    mock(Environment.class),
                    restTemplateBuilder,
                    "",
                    "");
        }

        @Bean
        public NationalGrantsService nationalGrantsService() {
            NationalGrantsService mock = mock(NationalGrantsService.class);
            when(mock.get(anyString()))
                    .thenReturn(NationalGrant.builder()
                            .heading("ECO: Help to Heat")
                            .description("Some households may get help towards the cost of fitting home energy " +
                                    "improvements through a scheme called ECO: Help to Heat.")
                            .linkToMeasures(true)
                            .displayWithoutMeasures(false)
                            .steps(ImmutableList.of(
                                    NationalGrant.Step.builder()
                                            .headline("ECO - What it is")
                                            .description("ECO is the main scheme for supporting energy efficiency " +
                                                    "improvements in British homes. All the larger energy supply companies " +
                                                    "are required to support a certain number of energy improvements in " +
                                                    "houses and flats, including insulation and some heating improvements.")
                                            .readMore(null)
                                            .moreInfoLinks(Collections.emptyList())
                                            .build(),
                                    NationalGrant.Step.builder()
                                            .headline("ECO - How do I get it")
                                            .description("When you click on the following link you’ll see a list of energy " +
                                                    "supply companies who offer ECO support. You can click on each company " +
                                                    "name to find more details on what help they can provide. You may need " +
                                                    "to look at a few to decide which companies are most likely to be able " +
                                                    "to help you.")
                                            .readMore(null)
                                            .moreInfoLinks(ImmutableList.of(
                                                    NationalGrant.Link.builder()
                                                            .buttonText("Find out more")
                                                            .linkUrl("/eco-suppliers")
                                                            .build()))
                                            .build()))
                            .build());
            return mock;
        }

        @Bean
        public DownloadPlanRequestParameterConverter paramConverter(ObjectMapper objectMapper) {
            return new DownloadPlanRequestParameterConverter(objectMapper);
        }

        @Bean
        public JavaMailSender javaMailSender() {
            return mock(JavaMailSender.class);
        }

        @Bean
        public InstallerSearchService installerSearchService() {
            return mock(InstallerSearchService.class);
        }
    }
}
