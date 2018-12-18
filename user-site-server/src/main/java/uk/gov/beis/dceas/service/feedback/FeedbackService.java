package uk.gov.beis.dceas.service.feedback;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.gov.beis.dceas.api.Feedback;
import uk.gov.beis.dceas.spring.exception.UnprocessableEntityException;

import javax.mail.MessagingException;
import java.io.IOException;

/**
 * This service stores feedback in the database, and send an email to BEIS
 */
@Service
public class FeedbackService {

    private final FeedbackDatabaseService feedbackDatabaseService;
    private final FeedbackEmailService feedbackEmailService;
    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    public FeedbackService(
            FeedbackDatabaseService feedbackDatabaseService,
            FeedbackEmailService feedbackEmailService
    ) {
        this.feedbackDatabaseService = feedbackDatabaseService;
        this.feedbackEmailService = feedbackEmailService;
    }

    public void processFeedback(Feedback feedback) throws MessagingException, IOException {
        try {
            feedbackDatabaseService.insert(feedback);
        } catch (Exception e) {
            log.error(
                    String.format("Inserting feedback into database failed for feedback by %s", feedback.getEmail()),
                    e
            );
            throw new UnprocessableEntityException();
        }

        feedbackEmailService.sendEmail(feedback);
    }
}
