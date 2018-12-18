package uk.gov.beis.dceas.service.feedback;

import org.jooq.Condition;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.gov.beis.dceas.api.Feedback;

import javax.annotation.Nullable;
import java.sql.Timestamp;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;

import static uk.gov.beis.dceas.db.gen.Tables.FEEDBACK;

@Service
public class FeedbackDatabaseService {

    private static final int RATE_LIMITING_SUBMISSION_THRESHOLD_IN_SECONDS = 5;

    private final DSLContext database;
    private final Clock clock;

    @Autowired
    public FeedbackDatabaseService(DSLContext database, Clock clock) {
        this.database = database;
        this.clock = clock;
    }

    @Nullable
    void insert(Feedback feedback) {
        database.insertInto(FEEDBACK)
                .set(FEEDBACK.NAME, feedback.getName())
                .set(FEEDBACK.EMAIL, feedback.getEmail())
                .set(FEEDBACK.SUBJECT, feedback.getSubject())
                .set(FEEDBACK.MESSAGE, feedback.getMessage())
                .execute();
    }
}
