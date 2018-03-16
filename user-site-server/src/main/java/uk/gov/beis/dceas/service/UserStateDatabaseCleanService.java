package uk.gov.beis.dceas.service;

import org.jooq.DSLContext;

import java.sql.Timestamp;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;

import static uk.gov.beis.dceas.db.gen.Tables.USER_STATE;

public class UserStateDatabaseCleanService {

    private final static int HOURS_TO_KEEP_STATE = 12;
    private final DSLContext dslContext;
    private final Clock clock;

    public UserStateDatabaseCleanService(DSLContext dslContext, Clock clock) {
        this.dslContext = dslContext;
        this.clock = clock;
    }

    public void cleanDatabase() {
        Timestamp threshold = Timestamp.from(Instant.now(clock)
            .minus(Duration.ofHours(HOURS_TO_KEEP_STATE)));

        dslContext
            .deleteFrom(USER_STATE)
            .where(USER_STATE.UPDATED.lessThan(threshold))
            .execute();
    }
}
