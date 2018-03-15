package uk.gov.beis.dceas.controller;

import org.jooq.DSLContext;
import org.springframework.web.bind.annotation.*;
import uk.gov.beis.dceas.api.UserState;
import uk.gov.beis.dceas.db.gen.tables.records.UserStateRecord;

import java.sql.Timestamp;
import java.time.Instant;

import static uk.gov.beis.dceas.db.gen.Tables.USER_STATE;
import static uk.gov.beis.dceas.spring.NotFoundException.notFoundIfNull;

@RestController
@RequestMapping("/api/userState")
public class UserStateController {

    private final DSLContext dslContext;

    public UserStateController(DSLContext dslContext) {
        this.dslContext = dslContext;
    }


    @GetMapping("/{reference}")
    public UserState getByReference(@PathVariable String reference) {
        return notFoundIfNull(
            dslContext
                .selectFrom(USER_STATE)
                .where(USER_STATE.REFERENCE.eq(reference))
                .fetchOne(UserState::fromDb)
        );
    }

    @PostMapping("/")
    public void createUserState(@RequestBody String state) {
        // TODO BEISDEAS-191 Generate reference
        String reference = "something";
        dslContext
            .insertInto(USER_STATE, USER_STATE.REFERENCE, USER_STATE.STATE, USER_STATE.UPDATED)
            .values(
                reference,
                state,
                Timestamp.from(Instant.now()))
            .execute();
    }

    @PutMapping("/{reference}")
    public void updateUserState(@PathVariable String reference, @RequestBody String state) {
        dslContext
            .update(USER_STATE)
            .set(USER_STATE.STATE, state)
            // TODO BEISDEAS-191 Worry about timezones etc.
            .set(USER_STATE.UPDATED, Timestamp.from(Instant.now()))
            .where(USER_STATE.REFERENCE.eq(reference))
            .execute();
    }
}
