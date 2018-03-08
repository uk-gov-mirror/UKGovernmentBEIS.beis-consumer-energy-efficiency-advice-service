package uk.gov.beis.dceas.controller;

import com.google.common.base.Joiner;
import org.jooq.DSLContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import uk.gov.beis.dceas.api.Boiler;
import uk.gov.beis.dceas.api.BoilerSearchResult;

import static com.google.common.primitives.Chars.asList;
import static uk.gov.beis.dceas.db.gen.Tables.BOILERS;
import static uk.gov.beis.dceas.spring.NotFoundException.notFoundIfNull;

@RestController
@RequestMapping("/api/boilers")
public class BoilerController {

    private static final int PAGE_SIZE = 20;
    private final DSLContext dslContext;

    public BoilerController(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    @GetMapping("/{productIndexNumber}")
    public Boiler getByProductIndexNumber(
        @PathVariable String productIndexNumber) {

        return notFoundIfNull(
            dslContext
                .selectFrom(BOILERS)
                .where(BOILERS.PRODUCT_INDEX_NUMBER.eq(productIndexNumber))
                .fetchOne(Boiler::fromDb));
    }

    @GetMapping
    public BoilerSearchResult search(
        @RequestParam("searchTerm") String searchTerm) {

        // We do a fuzzy match: the given string must appear in the boiler name,
        // but there may be letters in between.
        // Based on https://www.npmjs.com/package/fuzzysearch
        String likeQuery = "%" + Joiner.on('%')
            .join(asList(searchTerm.toCharArray())) + "%";

        return new BoilerSearchResult(
            dslContext
                .selectFrom(BOILERS)
                .where(BOILERS.NAME.likeIgnoreCase(likeQuery))
                .fetch(Boiler::fromDb));
    }
}
