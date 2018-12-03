package uk.gov.beis.dceas.service.feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import uk.gov.beis.dceas.api.Feedback;
import uk.gov.beis.dceas.service.ResourceService;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.text.MessageFormat;

@Service
public class FeedbackEmailService {

    private final JavaMailSender emailSender;
    private final String receiptEmail;
    private final ResourceService resourceService;

    @Autowired
    public FeedbackEmailService(
            JavaMailSender emailSender,
            @Value("${dceas.feedback-receipt-email}") String receiptEmail,
            ResourceService resourceService) {
        this.emailSender = emailSender;
        this.receiptEmail = receiptEmail;
        this.resourceService = resourceService;
    }

    void sendEmail(Feedback feedback) throws MessagingException, IOException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setTo(receiptEmail);
        helper.setFrom(receiptEmail);
        helper.setSubject("New feedback from " + feedback.getName());

        helper.setText(getEmailContent(feedback));

        emailSender.send(message);
    }

    private String getEmailContent(Feedback feedback) throws IOException {
        String emailTemplate = resourceService.getFileAsString("templates/feedback-email.txt");
        return MessageFormat.format(
                emailTemplate,
                feedback.getName(),
                feedback.getEmail(),
                feedback.getSubject(),
                feedback.getMessage()
        );
    }
}
