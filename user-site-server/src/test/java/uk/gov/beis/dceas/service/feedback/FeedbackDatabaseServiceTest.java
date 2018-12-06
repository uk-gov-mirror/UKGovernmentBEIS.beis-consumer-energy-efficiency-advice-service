package uk.gov.beis.dceas.service.feedback;

import org.apache.commons.text.RandomStringGenerator;
import org.jooq.DSLContext;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import uk.gov.beis.dceas.api.Feedback;
import uk.gov.beis.dceas.db.gen.tables.records.FeedbackRecord;

import static org.assertj.core.api.Assertions.assertThat;
import static uk.gov.beis.dceas.db.gen.Tables.FEEDBACK;

@RunWith(SpringRunner.class)
@SpringBootTest("integrationTest=true")
public class FeedbackDatabaseServiceTest {

    private static final String TEST_EMAIL_ADDRESS = getRandomEmailAddress();

    private static final Feedback TEST_FEEDBACK = Feedback.builder()
            .name("test name")
            .email(TEST_EMAIL_ADDRESS)
            .subject("example subject")
            .message("example message")
            .build();

    @Autowired
    private FeedbackDatabaseService feedbackDatabaseService;

    @Autowired
    private DSLContext database;

    @Test
    public void shouldInsertFeedbackIntoDatabase() {
        // when
        feedbackDatabaseService.insert(TEST_FEEDBACK);

        // then
        FeedbackRecord insertedRecord = getFeedbackRecordByEmail();
        assertThat(insertedRecord.getName()).isEqualTo(TEST_FEEDBACK.getName());
        assertThat(insertedRecord.getEmail()).isEqualTo(TEST_FEEDBACK.getEmail());
        assertThat(insertedRecord.getSubject()).isEqualTo(TEST_FEEDBACK.getSubject());
        assertThat(insertedRecord.getMessage()).isEqualTo(TEST_FEEDBACK.getMessage());
    }

    public FeedbackRecord getFeedbackRecordByEmail() {
        return database.selectFrom(FEEDBACK)
                .where(FEEDBACK.EMAIL.eq(TEST_EMAIL_ADDRESS))
                .fetchOne();
    }

    private static String getRandomEmailAddress() {
        RandomStringGenerator randomStringGenerator = new RandomStringGenerator.Builder()
                .withinRange('a', 'z')
                .build();

        return randomStringGenerator.generate(10) + "@example.com";
    }
}
