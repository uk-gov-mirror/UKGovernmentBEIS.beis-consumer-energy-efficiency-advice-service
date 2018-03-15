package uk.gov.beis.dceas.controller;

import org.jooq.DSLContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import uk.gov.beis.dceas.api.UserState;

import java.sql.Timestamp;
import java.time.Instant;

import static uk.gov.beis.dceas.db.gen.Tables.USER_STATE;
import static uk.gov.beis.dceas.spring.NotFoundException.notFoundIfNull;

@RestController
@RequestMapping("/api/userState")
public class UserStateController {

    private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int REFERENCE_CHARACTER_LENGTH = 8;

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

    @PostMapping
    public ResponseEntity<?> createUserState(UriComponentsBuilder builder, @RequestBody String state) {
        String reference = generateReference();
        dslContext
            .insertInto(USER_STATE, USER_STATE.REFERENCE, USER_STATE.STATE, USER_STATE.UPDATED)
            .values(
                reference,
                state,
                Timestamp.from(Instant.now()))
            .execute();

        // Respond with a 201 "Created" and a Location header containing the url of the created resource
        UriComponents uriComponents = builder.path("/api/userState/{reference}").buildAndExpand(reference);
        return ResponseEntity.created(uriComponents.toUri()).build();
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

    // TODO BEISDEAS-191 Generate 3 words as reference
    private static String generateReference() {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < REFERENCE_CHARACTER_LENGTH; i++) {
            int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());
            builder.append(ALPHA_NUMERIC_STRING.charAt(character));
        }
        return builder.toString();
    }
}
