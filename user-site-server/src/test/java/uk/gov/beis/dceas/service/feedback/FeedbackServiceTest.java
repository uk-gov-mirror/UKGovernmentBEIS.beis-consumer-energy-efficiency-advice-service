package uk.gov.beis.dceas.service.feedback;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import uk.gov.beis.dceas.api.Feedback;
import uk.gov.beis.dceas.spring.exception.TooManyRequestsException;
import uk.gov.beis.dceas.spring.exception.UnprocessableEntityException;

import javax.mail.MessagingException;
import java.io.IOException;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest("integrationTest=true")
public class FeedbackServiceTest {

    private static final Feedback TEST_FEEDBACK = Feedback.builder()
            .name("test name")
            .email("test@test.com")
            .subject("example subject")
            .message("example message")
            .build();

    @Autowired
    private FeedbackService feedbackService;

    @MockBean
    private FeedbackEmailService feedbackEmailService;

    @MockBean
    private FeedbackDatabaseService feedbackDatabaseService;

    @Test
    public void shouldInsertIntoDatabase() throws MessagingException, IOException, UnprocessableEntityException {
        // when
        feedbackService.processFeedback(TEST_FEEDBACK);

        // then
        verify(feedbackDatabaseService, times(1)).insert(TEST_FEEDBACK);
    }

    @Test
    public void shouldSendEmail() throws MessagingException, IOException, UnprocessableEntityException {
        // when
        feedbackService.processFeedback(TEST_FEEDBACK);

        // then
        verify(feedbackEmailService, times(1)).sendEmail(TEST_FEEDBACK);
    }

    @Test(expected = TooManyRequestsException.class)
    public void shouldThrowTooManyRequestsExceptionIfTheSameUserJustSubmittedFeedback() throws MessagingException, IOException, UnprocessableEntityException {
        // given
        when(feedbackDatabaseService.hasSubmittedFeedbackRightBefore(TEST_FEEDBACK)).thenReturn(true);

        // when
        feedbackService.processFeedback(TEST_FEEDBACK);

        // then
        // TooManyRequestsException expected
    }
}
