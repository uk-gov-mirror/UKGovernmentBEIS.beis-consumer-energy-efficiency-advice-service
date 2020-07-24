package uk.gov.beis.dceas.controller;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;


@RestController
@RequestMapping("/api/installers")
public class InstallerSearchController {
    private final Integer numberOfItemsPerPage = 20;
    private final String searchUrl;
    private final String idServerUrl;
    private final String clientId;
    private final String clientSecret;
    private final RestTemplate restTemplate;
    private final LoadingCache<String, String> accessTokenCache = CacheBuilder
            .newBuilder()
            // Trustmark token is valid for 1 hour. To be safe, we request a new one after 55 minutes.
            .expireAfterWrite(55, TimeUnit.MINUTES)
            .build(getAccessToken());
    private final Logger log = LoggerFactory.getLogger(getClass());

    public InstallerSearchController(
            @Value("${vcap.services.trustMark.search.url}")
                    String searchUrl,
            @Value("${vcap.services.trustMark.idServer.url}")
                    String idServerUrl,
            @Value("${vcap.services.trustMark.idServer.credentials.clientId}")
                    String clientId,
            @Value("${vcap.services.trustMark.idServer.credentials.clientSecret}")
                    String clientSecret,
            RestTemplateBuilder restTemplateBuilder) {
        this.searchUrl = searchUrl;
        this.idServerUrl = idServerUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.restTemplate = restTemplateBuilder.build();
    }

    @GetMapping("/{postcode}")
    public Object get(
            @PathVariable String postcode,
            @RequestParam String[] tradecodes,
            @RequestParam("page") Integer page) throws URISyntaxException {
        try {
            String accessToken = accessTokenCache.get("Trustmark Access Token");
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
            return response;
        } catch (ExecutionException e) {
            log.error("Failed to fetch Trustmark access token from cache.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (HttpClientErrorException e) {
            log.error("Failed to fetch data from the Trustmark API.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Error e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private CacheLoader<String, String> getAccessToken() {
        return new CacheLoader<String, String>() {
            @Override
            public String load(String key) {
                LinkedMultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
                formData.add("client_id", clientId);
                formData.add("client_secret", clientSecret);
                formData.add("grant_type", "client_credentials");
                formData.add("scope", "TrustMark.WebApi");
                TrustMarkIdResponse response = restTemplate.postForObject(idServerUrl, formData, TrustMarkIdResponse.class);
                return response.getAccessToken();
            }
        };
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
