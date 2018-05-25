package uk.gov.beis.dceas.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableList;
import com.google.common.io.Files;
import com.google.common.io.Resources;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.client.RestTemplate;
import uk.gov.beis.dceas.api.NationalGrant;
import uk.gov.beis.dceas.controller.EnergySavingPlanController.DownloadPlanRequest;
import uk.gov.beis.dceas.controller.EnergySavingPlanController.SelectedEnergyEfficiencyRecommendation;
import uk.gov.beis.dceas.service.MeasuresDataService;
import uk.gov.beis.dceas.service.NationalGrantsService;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(EnergySavingPlanController.class)
public class EnergySavingPlanControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testDownloadPlan() throws Exception {
        DownloadPlanRequest requestBody = DownloadPlanRequest.builder()
                .recommendations(
                        ImmutableList.of(
                                new SelectedEnergyEfficiencyRecommendation(
                                        "meta_wall_insulation_brick_age_band_a_d",
                                        null,
                                        null,
                                        9000.0,
                                        36.0,
                                        130.01,
                                        3814.27,
                                        "icons/walls.svg", // qq del iconPath?
                                        9),
                                new SelectedEnergyEfficiencyRecommendation(
                                        "meta_one_degree_reduction",
                                        null,
                                        null,
                                        0.0,
                                        null,
                                        43.86,
                                        1093.89,
                                        "icons/simple-savings.svg",
                                        3),
                                // A measure with an attached grant:
                                new SelectedEnergyEfficiencyRecommendation(
                                        "meta_loft_insulation",
                                        null,
                                        "eco-hhcro-help-to-heat",
                                        225.0,
                                        42.0,
                                        378.24,
                                        14511.59,
                                        "qq icon path",
                                        25))
                        // a grant: TODO
                )
                .tenureType(0)
                .potentialScore(72.0)
                .build();

        MvcResult mvcResult = mvc
                .perform(
                        post("/api/plan/download")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(status().isOk())
                .andReturn();

        File file = new File("out.pdf");
        Files.write(
                mvcResult.getResponse().getContentAsByteArray(),
                file);

        System.out.println("Open: " + file.getAbsolutePath());
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
                    restTemplateBuilder);
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
                                            .description("ECO is the main scheme for supporting energy efficiency improvements in British homes. All the larger energy supply companies are required to support a certain number of energy improvements in houses and flats, including insulation and some heating improvements.")
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
    }
}
