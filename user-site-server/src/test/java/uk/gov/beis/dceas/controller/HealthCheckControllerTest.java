package uk.gov.beis.dceas.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import uk.gov.beis.dceas.config.SecurityConfig;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@Import(SecurityConfig.class)
@SpringBootTest(properties = {
        "vcap.services.user-site-auth.credentials.username=someUsernameTheTestDoesn'tKnow",
        "vcap.services.user-site-auth.credentials.password=someObscurePasswordTheTestDoesn'tKnow"
})
@AutoConfigureMockMvc
public class HealthCheckControllerTest {
    @Autowired
    private MockMvc mvc;

    @Test
    public void healthCheckShouldReturn200() throws Exception {
        mvc.perform(get("/api/health"))
                .andExpect(status().isOk());
    }
}
