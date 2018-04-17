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
import java.util.Base64;

import static com.google.common.base.Preconditions.checkState;
import static com.google.common.base.Strings.isNullOrEmpty;
import static java.nio.charset.StandardCharsets.UTF_8;

@RestController
@RequestMapping("/api")
public class EpcLookupController implements ClientHttpRequestInterceptor {

    private final String apiAuthHeaderValue;
    private final String apiRoot;
    private final RestTemplate restTemplate;

    public EpcLookupController(
        @Value("${vcap.services.epc.opendatacommunities.org.credentials.username}")
            String apiUsername,
        @Value("${vcap.services.epc.opendatacommunities.org.credentials.password}")
                String apiPassword,
        @Value("${vcap.services.epc.opendatacommunities.org.credentials.apiRoot}")
            String apiRoot,
        RestTemplateBuilder restTemplateBuilder) {

        this.apiRoot = apiRoot;
        if (isNullOrEmpty(apiUsername) || isNullOrEmpty(apiPassword)) {
            this.apiAuthHeaderValue = null; // will throw at runtime; see below
        } else {
            this.apiAuthHeaderValue =
                    "Basic " + Base64.getEncoder().encodeToString(
                    (apiUsername + ":" + apiPassword).getBytes(UTF_8));
        }

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
            !isNullOrEmpty(apiAuthHeaderValue),
            "Cannot contact 'epc.opendatacommunities.org', no API auth has been set\n" +
                "On a production server, check the services as per 'Deploy from Scratch.md'.\n" +
                "On a dev machine, check `application-dev.properties.template`.");

        request.getHeaders().add("Authorization", apiAuthHeaderValue);

        // This would be added automatically by RestTemplate if we were deserializing the response
        request.getHeaders().add("Accept", "application/json");

        return execution.execute(request, body);
    }
}
