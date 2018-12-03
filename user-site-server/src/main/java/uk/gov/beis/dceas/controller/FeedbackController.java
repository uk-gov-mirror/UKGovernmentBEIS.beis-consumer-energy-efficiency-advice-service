package uk.gov.beis.dceas.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.gov.beis.dceas.api.Feedback;
import uk.gov.beis.dceas.service.feedback.FeedbackService;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/feedback")
    public void submitFeedback(
            @Valid @RequestBody Feedback feedback
    ) throws MessagingException, IOException {
        feedbackService.processFeedback(feedback);
    }
}
