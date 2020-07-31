package uk.gov.beis.dceas.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import uk.gov.beis.dceas.service.InstallerSearchService;
import uk.gov.beis.dceas.service.InstallerSearchService.TrustMarkSearchResponse;

import java.net.URISyntaxException;

@RestController
@RequestMapping("/api/installers")
public class InstallerSearchController {

    private final InstallerSearchService installerSearchService;

    public InstallerSearchController(InstallerSearchService installerSearchService) {
        this.installerSearchService = installerSearchService;
    }

    @GetMapping("/{postcode}")
    public ResponseEntity<TrustMarkSearchResponse> get(
            @PathVariable String postcode,
            @RequestParam String[] tradecodes,
            @RequestParam("page") Integer page) throws URISyntaxException {
        try {
            TrustMarkSearchResponse installers = installerSearchService.findInstallers(postcode, tradecodes, page);
            return new ResponseEntity<>(installers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
