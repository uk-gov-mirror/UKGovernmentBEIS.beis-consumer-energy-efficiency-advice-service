package uk.gov.beis.dceas.controller;

import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.UUID;

import static com.google.common.base.Preconditions.checkState;
import static com.google.common.base.Strings.isNullOrEmpty;
import static java.nio.charset.StandardCharsets.UTF_8;

@RestController
@RequestMapping("/api/installers")
public class InstallerSearchController implements ClientHttpRequestInterceptor {

    private final String apiUrl;
    private final String apiUsername;
    private final String apiPassword;
    private final String apiAuthHeaderValue;
    private final RestTemplate restTemplate;


    public InstallerSearchController (
            @Value("${vcap.services.greenDealOrb.credentials.url}")
                    String apiUrl,
            @Value("${vcap.services.greenDealOrb.credentials.username}")
                    String apiUsername,
            @Value("${vcap.services.greenDealOrb.credentials.password}")
                    String apiPassword,
            RestTemplateBuilder restTemplateBuilder) {

        this.apiUrl = apiUrl;
        this.apiUsername = apiUsername;
        this.apiPassword = apiPassword;

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
     * Sends user data to the BRE energy calculation API, returns their
     * JSON unmodified to the js frontend.
     */
    @GetMapping("/{postcode}/{installerCode}")
    public String get(@PathVariable String postcode, @PathVariable int installerCode) throws IOException {

        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .build().encode().toUriString();

        System.out.println(restTemplate.getForObject(url, String.class));

        return restTemplate.getForObject(url, String.class);
    }

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        return execution.execute(request, body);
    }
}
