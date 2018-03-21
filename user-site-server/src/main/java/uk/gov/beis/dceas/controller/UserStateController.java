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
import uk.gov.beis.dceas.data.RandomWordList;
import uk.gov.beis.dceas.service.IpValidationService;
import uk.gov.beis.dceas.spring.ForbiddenException;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Random;

import static uk.gov.beis.dceas.db.gen.Tables.USER_STATE;
import static uk.gov.beis.dceas.spring.NotFoundException.notFoundIfNull;

@RestController
@RequestMapping("/api/userState")
public class UserStateController {

    private static final int WORD_COUNT = 3;
    private static Random rnd = new SecureRandom();

    private final DSLContext dslContext;
    private final IpValidationService ipValidationService;

    public UserStateController(DSLContext dslContext, IpValidationService ipValidationService) {
        this.dslContext = dslContext;
        this.ipValidationService = ipValidationService;
    }


    @GetMapping("/{reference}")
    public UserState getByReference(@PathVariable String reference, HttpServletRequest request) throws UnsupportedEncodingException {
        if (!ipValidationService.requestIsInIpWhitelist(request)) {
            throw new ForbiddenException();
        }
        return notFoundIfNull(
            dslContext
                .selectFrom(USER_STATE)
                .where(USER_STATE.ID.eq(reference.toLowerCase()))
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
    public ResponseEntity<?> updateUserState(@PathVariable String reference, @RequestBody String state) throws UnsupportedEncodingException {
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

    /**
     * There are 683 words to be chosen from, this leads to:
     * 683 ^ 3 = 318,611,987 possible combinations
     * This makes these references extremely unguessable, and is compounded by the fact that the list of
     * possible words is not known to users
     */
    private String generateReference() {
        List<String> words = RandomWordList.WORDS;

        StringBuilder builder = new StringBuilder();
        String sep = "";
        for (int i = 0; i < WORD_COUNT; i++) {
            int index = rnd.nextInt(words.size());
            builder.append(sep).append(words.get(index));
            sep = " ";
        }
        return builder.toString();
    }
}
