package uk.gov.beis.dceas.api;

import lombok.Value;
import uk.gov.beis.dceas.db.gen.tables.records.UserStateRecord;

import java.sql.Timestamp;

/**
 * API class for a user state
 *
 * TODO BEISDEAS-181 Add corresponding JS model and reference here
 */
@Value
@SuppressWarnings("checkstyle:visibilitymodifier")
public class UserState {
    String reference;
    String state;
    Timestamp updated;

    public static UserState fromDb(UserStateRecord record) {
        return new UserState(
            record.getId(),
            record.getState(),
            record.getUpdated());
    }
}
