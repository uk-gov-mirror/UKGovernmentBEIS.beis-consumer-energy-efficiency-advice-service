package uk.gov.beis.dceas.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

import static com.google.common.base.Preconditions.checkState;
import static com.google.common.base.Strings.isNullOrEmpty;

@RestController
@RequestMapping("/api")
public class EpcLookupController implements ClientHttpRequestInterceptor {

    private final String apiToken;
    private final String apiRoot;
    private final RestTemplate restTemplate;

    public EpcLookupController(
        @Value("${epc.opendatacommunities.org.auth}")
            String apiToken,
        @Value("${epc.opendatacommunities.org.apiRoot}")
            String apiRoot,
        RestTemplateBuilder restTemplateBuilder) {

        this.apiRoot = apiRoot;
        this.apiToken = apiToken;

        this.restTemplate = restTemplateBuilder
            .interceptors(this)
            .build();
    }

    /**
     * Looks up public EPC results by postcode.
     *
     * See https://epc.opendatacommunities.org/docs/api/domestic#domestic-search
     *
     * @param postcode the postcode to search
     * @param size     page size
     */
    @GetMapping("/epc")
    public String getByAddress(
        @RequestParam String postcode,
        @RequestParam String size) throws IOException {

        String url = UriComponentsBuilder.fromHttpUrl(apiRoot + "/domestic/search")
            .queryParam("postcode", postcode)
            .queryParam("size", size)
            .build().encode().toUriString();

        return restTemplate.getForObject(url, String.class);
    }

    /**
     * Looks up public EPC recommendations by EPC "lmk-key" (its ID)
     *
     * See https://epc.opendatacommunities.org/docs/api/domestic#domestic-recommendations
     *
     * @param lmkKey the id of the EPC
     */
    @GetMapping("/epc-recommendations")
    public String getRecommendationsByEpc(
        @RequestParam String lmkKey) throws IOException {

        String url = UriComponentsBuilder.fromHttpUrl(apiRoot + "/domestic/recommendations/")
            .path(lmkKey)
            .build().encode().toUriString();

        return restTemplate.getForObject(url, String.class);
    }

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {

        checkState(
            !isNullOrEmpty(apiToken),
            "Cannot contact 'epc.opendatacommunities.org', no API token has been set\n" +
                "On a production server, check the ENV vars as per 'Deploy from Scratch.md'.\n" +
                "On a dev machine, check `application-dev.properties.template`.");

        request.getHeaders().add("Authorization", "Basic " + apiToken);

        // This would be added automatically by RestTemplate if we were deserializing the response
        request.getHeaders().add("Accept", "application/json");

        return execution.execute(request, body);
    }
}
