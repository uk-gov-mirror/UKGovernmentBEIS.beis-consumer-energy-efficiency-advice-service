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

import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Random;

import static uk.gov.beis.dceas.db.gen.Tables.USER_STATE;
import static uk.gov.beis.dceas.db.gen.Tables.WORDS;
import static uk.gov.beis.dceas.spring.NotFoundException.notFoundIfNull;

@RestController
@RequestMapping("/api/userState")
public class UserStateController {

    private static final int WORD_COUNT = 3;
    private static Random rnd = new SecureRandom();

    private final DSLContext dslContext;

    public UserStateController(DSLContext dslContext) {
        this.dslContext = dslContext;
    }


    @GetMapping("/{reference}")
    public UserState getByReference(@PathVariable String reference) {
        return notFoundIfNull(
            dslContext
                .selectFrom(USER_STATE)
                .where(USER_STATE.ID.eq(reference))
                .fetchOne(UserState::fromDb)
        );
    }

    @PostMapping
    public ResponseEntity<?> createUserState(UriComponentsBuilder builder, @RequestBody String state) {
        String reference = generateReference();
        int recordsCreated = dslContext
            .insertInto(USER_STATE)
            .set(USER_STATE.ID, reference)
            .set(USER_STATE.STATE, state)
            .set(USER_STATE.UPDATED, Timestamp.from(Instant.now()))
            .execute();

        if (recordsCreated == 0) {
            return ResponseEntity.notFound().build();
        }

        // Respond with a 201 "Created" and a Location header containing the url of the created resource
        UriComponents uriComponents = builder.path("/api/userState/{reference}").buildAndExpand(reference);
        return ResponseEntity.created(uriComponents.toUri()).build();
    }

    @PutMapping("/{reference}")
    public ResponseEntity<?> updateUserState(@PathVariable String reference, @RequestBody String state) {
        int entriesUpdated = dslContext
            .update(USER_STATE)
            .set(USER_STATE.STATE, state)
            .set(USER_STATE.UPDATED, Timestamp.from(Instant.now()))
            .where(USER_STATE.ID.eq(reference))
            .execute();

        if (entriesUpdated == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    private String generateReference() {
        List<String> words = dslContext
            .selectFrom(WORDS)
            .fetch()
            .getValues(WORDS.WORD);

        // TODO BEISDEAS-191 comment on unguessability
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < WORD_COUNT; i++) {
            int index = rnd.nextInt(words.size());
            builder.append(words.get(index));
        }
        return builder.toString();
    }
}
