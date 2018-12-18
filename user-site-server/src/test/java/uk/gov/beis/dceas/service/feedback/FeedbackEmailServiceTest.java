package uk.gov.beis.dceas.service.feedback;

import com.google.common.collect.ImmutableList;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import uk.gov.beis.dceas.api.Feedback;
import uk.gov.beis.dceas.rule.SmtpServerRule;
import uk.gov.beis.dceas.service.ResourceService;

import javax.mail.Address;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest("integrationTest=true")
@ActiveProfiles("test")
public class FeedbackEmailServiceTest {

    private static final Feedback TEST_FEEDBACK = Feedback.builder()
            .name("test name")
            .email("test@test.com")
            .subject("example subject")
            .message("example message")
            .build();

    private static final String EXPECTED_EMAIL_SUBJECT = "New feedback from " + TEST_FEEDBACK.getName();
    private static final String EXPECTED_EMAIL_TO = "feedback@example.com";
    private static final String EXPECTED_EMAIL_FROM = "feedback@example.com";

    @Rule
    public SmtpServerRule smtpServerRule = new SmtpServerRule(2525);

    @Autowired
    private FeedbackEmailService feedbackEmailService;

    @Autowired
    private ResourceService resourceService;

    @Test
    public void shouldSendEmail() throws IOException, MessagingException {
        // when
        feedbackEmailService.sendEmail(TEST_FEEDBACK);

        // then
        MimeMessage emailSent = smtpServerRule.getLastMessage();
        assertThat(emailSent.getSubject()).isEqualTo(EXPECTED_EMAIL_SUBJECT);
        assertThat(getAllFromAddresses(emailSent)).containsExactlyElementsOf(ImmutableList.of(EXPECTED_EMAIL_FROM));
        assertThat(getAllReceiptAddresses(emailSent)).containsExactlyElementsOf(ImmutableList.of(EXPECTED_EMAIL_TO));
        assertThat(emailSent.getContent()).isEqualTo(getExpectedEmailContent());
    }

    private String getExpectedEmailContent() throws IOException {
        return resourceService.getFileAsString("uk/gov/beis/dceas/service/feedback/expected-email-content.txt");
    }

    private List<String> getAllFromAddresses(MimeMessage emailSent) throws MessagingException {
        return Arrays.stream(emailSent.getFrom())
                .map(Address::toString)
                .collect(toList());
    }

    private List<String> getAllReceiptAddresses(MimeMessage emailSent) throws MessagingException {
        return Arrays.stream(emailSent.getAllRecipients())
                .map(Address::toString)
                .collect(toList());
    }


}
