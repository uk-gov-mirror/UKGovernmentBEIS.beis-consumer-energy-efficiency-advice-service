package uk.gov.beis.dceas.service;

import org.jooq.DSLContext;
import org.jooq.Result;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;

import static org.assertj.core.api.Assertions.assertThat;
import static uk.gov.beis.dceas.db.gen.Tables.ECO_SELF_REFERRAL;

@RunWith(SpringRunner.class)
@SpringBootTest("integrationTest=true")
public class ECOSelfReferralDatabaseCleanServiceTest {

    private static final Instant MOCK_TIME_NOW = Instant.parse("2020-03-18T14:41:30.00Z");

    @Autowired
    private DSLContext database;

    private ECOSelfReferralDatabaseCleanService underTest;

    @Before
    public void setUp() {
        Clock mockClock = Clock.fixed(MOCK_TIME_NOW, ZoneId.systemDefault());
        database.deleteFrom(ECO_SELF_REFERRAL).execute();
        underTest = new ECOSelfReferralDatabaseCleanService(database, mockClock);
    }

    @Test
    public void cleansOldData() {
        // Arrange
        database.insertInto(ECO_SELF_REFERRAL)
                .set(ECO_SELF_REFERRAL.NAME, "Bruce Banner")
                .set(ECO_SELF_REFERRAL.CREATED, Timestamp.from(MOCK_TIME_NOW.minus(Duration.ofDays(366))))
                .execute();

        // Act
        underTest.cleanDatabase();

        // Assert
        Result<?> result = database
                .selectFrom(ECO_SELF_REFERRAL)
                .where(ECO_SELF_REFERRAL.NAME.eq("Bruce Banner"))
                .fetch();
        assertThat(result).isEmpty();
    }

    @Test
    public void keepsRecentData() {
        // Arrange
        database.insertInto(ECO_SELF_REFERRAL)
                .set(ECO_SELF_REFERRAL.NAME, "Peter Parker")
                .set(ECO_SELF_REFERRAL.CREATED, Timestamp.from(MOCK_TIME_NOW.minus(Duration.ofDays(364))))
                .execute();

        // Act
        underTest.cleanDatabase();

        // Assert
        Result<?> result = database
                .selectFrom(ECO_SELF_REFERRAL)
                .where(ECO_SELF_REFERRAL.NAME.eq("Peter Parker"))
                .fetch();
        assertThat(result).isNotEmpty();
    }
}
