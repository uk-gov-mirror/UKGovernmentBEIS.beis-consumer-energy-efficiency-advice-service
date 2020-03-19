package uk.gov.beis.dceas.service;

import org.jooq.DSLContext;
import org.jooq.exception.DataAccessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;

import static uk.gov.beis.dceas.db.gen.Tables.ECO_SELF_REFERRAL;

@Service
public class ECOSelfReferralDatabaseCleanService {

    private static final Duration MAX_AGE = Duration.ofDays(365);

    private final DSLContext dslContext;
    private final Clock clock;

    @Autowired
    public ECOSelfReferralDatabaseCleanService(DSLContext dslContext, Clock clock) {
        this.dslContext = dslContext;
        this.clock = clock;
    }

    public void cleanDatabase() throws DataAccessException {
        Timestamp threshold = Timestamp.from(Instant.now(clock).minus(MAX_AGE));
        dslContext
            .deleteFrom(ECO_SELF_REFERRAL)
            .where(ECO_SELF_REFERRAL.CREATED.lessThan(threshold))
            .execute();
    }
}
