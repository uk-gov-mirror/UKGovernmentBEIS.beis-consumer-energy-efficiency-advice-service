package uk.gov.beis.dceas.controller;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;


@RestController
@RequestMapping("/api/installers")
public class InstallerSearchController {
    private final Integer numberOfItemsPerPage = 20;
    private final String searchUrl;
    private final String idServerUrl;
    private final String clientId;
    private final String clientSecret;
    private final RestTemplate restTemplate;

    public InstallerSearchController(
            @Value("${vcap.services.trustMark.credentials.search.url}")
                    String searchUrl,
            @Value("${vcap.services.trustMark.credentials.idServer.url}")
                    String idServerUrl,
            @Value("${vcap.services.trustMark.credentials.idServer.clientId}")
                    String clientId,
            @Value("${vcap.services.trustMark.credentials.idServer.clientSecret}")
                    String clientSecret,
            RestTemplateBuilder restTemplateBuilder) {
        this.searchUrl = searchUrl;
        this.idServerUrl = idServerUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.restTemplate = restTemplateBuilder.build();
    }

    @GetMapping("/{postcode}")
    public String get(
            @PathVariable String postcode,
            @RequestParam String[] tradecodes,
            @RequestParam("page") Integer page) throws URISyntaxException {
        String accessToken = getAccessToken();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        // We need to wrap in new URI() rather than using the string to prevent double encoding of spaces in the
        // postcode. Without this, postcode parameters come out as (e.g.) NW5%25201TL instead of NW5%201TL.
        URI url = new URI(UriComponentsBuilder.fromHttpUrl(searchUrl)
                .queryParam("postcode", postcode)
                .queryParam("tradecodes", tradecodes)
                .queryParam("pageNumber", page)
                .queryParam("pageSize", numberOfItemsPerPage)
                .toUriString());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    private String getAccessToken() {
        LinkedMultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", clientId);
        formData.add("client_secret", clientSecret);
        formData.add("grant_type", "client_credentials");
        formData.add("scope", "TrustMark.WebApi");
        TrustMarkIdResponse response = restTemplate.postForObject(idServerUrl, formData, TrustMarkIdResponse.class);
        return response.getAccessToken();
    }

    @lombok.Value
    @Builder
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    @SuppressWarnings("checkstyle:visibilitymodifier")
    public static class TrustMarkIdResponse {
        String accessToken;
        String expiresIn;
        String tokenType;
        String scope;
    }
}
