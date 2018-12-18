package uk.gov.beis.dceas.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.web.context.WebApplicationContext;
import uk.gov.beis.dceas.service.ResourceService;
import uk.gov.beis.dceas.service.feedback.FeedbackEmailService;

import java.io.IOException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest("integrationTest=true")
public class FeedbackControllerTest {

    private static final int REQUESTS_DAILY_LIMIT = 10;
    private static final String IP_ADDRESS_1 = "192.168.0.1";
    private static final String IP_ADDRESS_2 = "192.168.0.2";

    private MockMvc mvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private ResourceService resourceService;

    @MockBean
    private FeedbackEmailService emailService;

    @Before
    public void setUp() {
        this.mvc = webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void submitFeedbackReturnsOkWhenRequestLimitNotReached() throws Exception {
        // given
        performPostRepeatedlyFromIp(REQUESTS_DAILY_LIMIT - 1, IP_ADDRESS_1);

        // when
        ResultActions result = performPostFromIp(IP_ADDRESS_1);

        // then
        result.andExpect(status().isOk());
    }

    @Test
    public void submitFeedbackReturnsTooManyRequestsWhenRequestLimitReached() throws Exception {
        // given
        performPostRepeatedlyFromIp(REQUESTS_DAILY_LIMIT, IP_ADDRESS_1);

        // when
        ResultActions result = performPostFromIp(IP_ADDRESS_1);
        // then
        result.andExpect(status().isTooManyRequests());
    }

    @Test
    public void submitFeedbackThrottlesRequestByIP() throws Exception {
        // given
        performPostRepeatedlyFromIp(REQUESTS_DAILY_LIMIT, IP_ADDRESS_1);

        // when
        ResultActions result = performPostFromIp(IP_ADDRESS_2);

        // then
        result.andExpect(status().isOk());
    }

    private void performPostRepeatedlyFromIp(int numberOfTimes, String ipAddress) throws Exception {
        for (int i = 0; i < numberOfTimes; i++) {
            performPostFromIp(ipAddress);
        }
    }

    private ResultActions performPostFromIp(String ipAddress) throws Exception {
        RequestPostProcessor postProcessor = request -> {
            request.setRemoteAddr(ipAddress);
            return request;
        };

        return mvc.perform(post("/api/feedback")
                .content(getFeedbackRequest())
                .contentType(MediaType.APPLICATION_JSON)
                .with(postProcessor));
    }

    private String getFeedbackRequest() throws IOException {
        return resourceService.getFileAsString("uk/gov/beis/dceas/service/feedback/feedback-request.json");
    }
}
