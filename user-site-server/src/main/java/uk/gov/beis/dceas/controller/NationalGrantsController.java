package uk.gov.beis.dceas.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.gov.beis.dceas.api.NationalGrant;
import uk.gov.beis.dceas.service.NationalGrantsService;

import java.util.Collection;

/**
 * Gets info on National Grants from the database.
 *
 * The eligibility criteria are stored in javascript code, see e.g.
 * cold-weather-payments.ts
 *
 * The info is stored as "Posts" in WP, with custom fields in the meta table.
 *
 * TODO:BEIS-214 how does the data get updated?
 */
@RestController
@RequestMapping("/api")
public class NationalGrantsController {

    private final NationalGrantsService nationalGrantsService;

    public NationalGrantsController(NationalGrantsService nationalGrantsService) {
        this.nationalGrantsService = nationalGrantsService;
    }

    @GetMapping("/national-grants")
    public Collection<NationalGrant> get() throws Exception {
        return nationalGrantsService.list();
    }
}
