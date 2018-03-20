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
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static uk.gov.beis.dceas.db.gen.Tables.USER_STATE;

@RunWith(SpringRunner.class)
@SpringBootTest("integrationTest=true")
public class UserStateDatabaseCleanServiceTest {

    @Autowired
    private DSLContext database;

    private static final Instant MOCK_TIME_NOW = Instant.parse("2007-12-03T10:15:30.00Z");
    private UserStateDatabaseCleanService underTest;

    @Before
    public void setUp() {
        Clock mockClock = Clock.fixed(MOCK_TIME_NOW, ZoneId.systemDefault());
        database.deleteFrom(USER_STATE).execute();
        underTest = new UserStateDatabaseCleanService(database, mockClock);
    }

    @Test
    public void cleansOldData() {
        // Arrange
        database.insertInto(USER_STATE)
            .set(USER_STATE.ID, "cleansOldData")
            .set(USER_STATE.STATE, "state")
            .set(USER_STATE.UPDATED, Timestamp.from(MOCK_TIME_NOW.minus(Duration.ofHours(24))))
            .execute();

        // Act
        underTest.cleanDatabase();

        // Assert
        Result result = database
            .selectFrom(USER_STATE)
            .where(USER_STATE.ID.eq("cleansOldData"))
            .fetch();
        assertThat(result.isEmpty()).isTrue();
    }

    @Test
    public void keepsRecentData() {
        // Arrange
        database.insertInto(USER_STATE)
            .set(USER_STATE.ID, "keepsRecentData")
            .set(USER_STATE.STATE, "state")
            .set(USER_STATE.UPDATED, Timestamp.from(MOCK_TIME_NOW.minus(Duration.ofHours(1))))
            .execute();

        // Act
        underTest.cleanDatabase();

        // Assert
        Result result = database
            .selectFrom(USER_STATE)
            .where(USER_STATE.ID.eq("keepsRecentData"))
            .fetch();
        assertThat(result.isNotEmpty()).isTrue();
    }
}
