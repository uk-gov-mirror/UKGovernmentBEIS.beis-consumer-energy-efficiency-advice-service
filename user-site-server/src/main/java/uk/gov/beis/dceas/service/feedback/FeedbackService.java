package uk.gov.beis.dceas.service.feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.gov.beis.dceas.api.Feedback;
import uk.gov.beis.dceas.spring.exception.TooManyRequestsException;
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

    @Autowired
    public FeedbackService(
            FeedbackDatabaseService feedbackDatabaseService,
            FeedbackEmailService feedbackEmailService
    ) {
        this.feedbackDatabaseService = feedbackDatabaseService;
        this.feedbackEmailService = feedbackEmailService;
    }

    public void processFeedback(Feedback feedback) throws MessagingException, IOException {

        if (feedbackDatabaseService.hasSubmittedFeedbackRightBefore(feedback)) {
            throw new TooManyRequestsException();
        }

        Integer recordId = feedbackDatabaseService.insert(feedback);
        if (recordId == null) {
            throw new UnprocessableEntityException();
        }
        feedbackEmailService.sendEmail(feedback);
    }
}
