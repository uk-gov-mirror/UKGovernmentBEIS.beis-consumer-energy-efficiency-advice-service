package uk.gov.beis.dceas.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableList;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import uk.gov.beis.dceas.controller.EnergySavingPlanController.DownloadPlanRequest;
import uk.gov.beis.dceas.controller.EnergySavingPlanController.SelectedEnergyEfficiencyRecommendation;

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
        DownloadPlanRequest requestBody = new DownloadPlanRequest(
                ImmutableList.of(
                        new SelectedEnergyEfficiencyRecommendation(
                                "meta_wall_insulation_brick_age_band_a_d"

                        ),
                        new SelectedEnergyEfficiencyRecommendation(
                                "meta_one_degree_reduction"
                        )
                )
        );


        mvc
                .perform(
                        post("/api/plan/download")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(status().isOk());
    }
}