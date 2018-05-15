package uk.gov.beis.dceas.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
@RestController
@RequestMapping("/api/installers")
public class InstallerSearchController{

    private final String apiRoot;
    private final String apiKey;
    private final RestTemplate restTemplate;


    public InstallerSearchController (
            @Value("${vcap.services.greenDealOrb.credentials.url}")
                    String apiRoot,
            @Value("${vcap.services.greenDealOrb.credentials.key}")
                    String apiKey,
            RestTemplateBuilder restTemplateBuilder) {

        this.apiRoot = apiRoot;
        this.apiKey = apiKey;

        this.restTemplate = restTemplateBuilder
                .build();
    }
    
    @GetMapping("/{postcode}/{installerCode}")
    public String get(@PathVariable String postcode, @PathVariable int installerCode) throws IOException {

        String url = UriComponentsBuilder.fromHttpUrl(apiRoot)
                .queryParam("ep", "search")
                .queryParam("key", apiKey)
                .queryParam("parameters[postcode]", postcode)
                .queryParam("parameters[services][]", installerCode)
                .build().toString();

        return restTemplate.getForObject(url, String.class);
    }
}
