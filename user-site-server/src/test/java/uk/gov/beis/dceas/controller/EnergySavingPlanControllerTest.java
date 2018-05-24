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
import uk.gov.beis.dceas.controller.EnergySavingPlanController.DownloadPlanRequest;
import uk.gov.beis.dceas.controller.EnergySavingPlanController.SelectedEnergyEfficiencyRecommendation;
import uk.gov.beis.dceas.service.MeasuresDataService;

import java.io.File;
import java.io.IOException;
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
                                        9000.0,
                                        36.0,
                                        130.01,
                                        3814.27,
                                        "icons/walls.svg",
                                        9),
                                new SelectedEnergyEfficiencyRecommendation(
                                        "meta_one_degree_reduction",
                                        null,
                                        0.0,
                                        null,
                                        43.86,
                                        1093.89,
                                        "icons/simple-savings.svg",
                                        3)))
                .tenureType(0)
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
    }
}
