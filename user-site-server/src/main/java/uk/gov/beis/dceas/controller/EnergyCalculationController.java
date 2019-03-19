package uk.gov.beis.dceas.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

import static com.google.common.base.Preconditions.checkState;
import static com.google.common.base.Strings.isNullOrEmpty;

@RestController
@RequestMapping("/api")
public class EnergyCalculationController implements ClientHttpRequestInterceptor {

    private static final String DEFAULT_RECOMMENDATION_RESPONSES_PATH = "default-recommendation-responses/";
    private static final int FUEL_TYPE_ELECTRICITY = 29;
    private static final int PROPERTY_TYPE_FLAT = 2;
    private static final String REQUEST_RENTED_PROPERTY = "rented";
    private static final String RESPONSE_RENTAL_MEASURES = "measures_rented";
    private static final String RESPONSE_DEFAULT_RENTAL_MEASURES = "default_rental_measures";
    private static final String REQUEST_HEATING_FUEL = "heating_fuel";
    private static final TypeReference<Map<String, Object>> OBJECT_MAPPER_TYPE_REFERENCE =
            new TypeReference<Map<String, Object>>() {};

    private final String apiUrl;
    private final String apiUsername;
    private final String apiPassword;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    public EnergyCalculationController(
            @Value("${vcap.services.bre.energyUse.credentials.url}")
                    String apiUrl,
            @Value("${vcap.services.bre.energyUse.credentials.username}")
                    String apiUsername,
            @Value("${vcap.services.bre.energyUse.credentials.password}")
                    String apiPassword,
            RestTemplateBuilder restTemplateBuilder,
            ObjectMapper objectMapper
    ) {
        this.apiUrl = apiUrl;
        this.apiUsername = apiUsername;
        this.apiPassword = apiPassword;

        this.restTemplate = restTemplateBuilder
            .interceptors(this)
            .build();
        this.objectMapper = objectMapper;
    }

    /**
     * Sends user data to the BRE energy calculation API, returns their
     * JSON unmodified to the js frontend. If the request fails, sends default
     * response.
     */
    @PostMapping("/energy-calculation")
    public String post(
            @RequestBody String requestJson,
            @RequestParam("property-type") Integer propertyType
    ) throws IOException {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
            .build().encode().toUriString();

        LinkedMultiValueMap<String, Object> formValues = new LinkedMultiValueMap<>();
        formValues.add("requestData", requestJson);

        try {
            String response = restTemplate.postForObject(url, formValues, String.class);
            if (userIsRenting(requestJson) && !responseHasRentalMeasures(response)) {
                response = getResponseWithDefaultRentalMeasures(response);
            }
            return response;
        } catch (Exception e){
            Integer fuelType = getFuelTypeFromRequest(requestJson);
            return getDefaultResponse(propertyType, fuelType);
        }
    }

    private boolean userIsRenting(@RequestBody String requestJson) throws IOException {
        Map<String, Object> request = objectMapper.readValue(requestJson, OBJECT_MAPPER_TYPE_REFERENCE);
        return Boolean.parseBoolean(request.get(REQUEST_RENTED_PROPERTY).toString());
    }

    private boolean responseHasRentalMeasures(String responseJson) throws IOException {
        Map<String, Object> request = objectMapper.readValue(responseJson, OBJECT_MAPPER_TYPE_REFERENCE);
        return request.get(RESPONSE_RENTAL_MEASURES) != null;
    }

    private String getResponseWithDefaultRentalMeasures(String responseJson) throws IOException {
        Map<String, Object> response = objectMapper.readValue(responseJson, OBJECT_MAPPER_TYPE_REFERENCE);
        String defaultRentalMeasuresJson = getDefaultRentalMeasures();
        Map<String, Object> defaultRentalMeasures = objectMapper.readValue(defaultRentalMeasuresJson, OBJECT_MAPPER_TYPE_REFERENCE);
        response.put(RESPONSE_DEFAULT_RENTAL_MEASURES, defaultRentalMeasures);
        return objectMapper.writeValueAsString(response);
    }

    private Integer getFuelTypeFromRequest(@RequestBody String requestJson) throws IOException {
        Map<String, Object> request = objectMapper.readValue(requestJson, OBJECT_MAPPER_TYPE_REFERENCE);
        return Integer.parseInt((String) request.get(REQUEST_HEATING_FUEL));
    }

    private String getDefaultResponse(Integer propertyType, Integer fuelType) throws IOException {
        if (propertyType == PROPERTY_TYPE_FLAT) {
            return fuelType == FUEL_TYPE_ELECTRICITY
                    ? getDefaultRecommendationResponse("electric-heating-flat-response.json")
                    : getDefaultRecommendationResponse("non-electric-heating-flat-response.json");
        }
        return fuelType == FUEL_TYPE_ELECTRICITY
                ? getDefaultRecommendationResponse("electric-heating-house-response.json")
                : getDefaultRecommendationResponse("non-electric-heating-house-response.json");
    }

    private String getDefaultRecommendationResponse(String filename) throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        return IOUtils.toString(classLoader.getResourceAsStream(DEFAULT_RECOMMENDATION_RESPONSES_PATH + filename), Charsets.UTF_8);
    }

    private String getDefaultRentalMeasures() throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        return IOUtils.toString(classLoader.getResourceAsStream("default-rental-measures.json"), Charsets.UTF_8);
    }

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {

        checkState(
            !isNullOrEmpty(apiUsername),
            "Cannot contact BRE Energy Use API, no auth details have been set\n" +
                "On a production server, check the ENV vars as per 'Deploy from Scratch.md'.\n" +
                "On a dev machine, check `application-dev.properties.template`.");

        String created = Instant.now().toString();
        String nonce = UUID.randomUUID().toString();
        String hashInput = String.format("%s%s%s%s", apiPassword, nonce, apiUsername, created);
        String hashOutput = Hashing.sha256()
            .hashString(hashInput, StandardCharsets.UTF_8)
            .toString();

        String auth = String.format(
            "WSSE UsernameToken Token=\"%s\", Nonce=\"%s\", Username=\"%s\", Created=\"%s\"",
            hashOutput,
            nonce,
            apiUsername,
            created);

        request.getHeaders().add("Authorization", auth);

        // This would be added automatically by RestTemplate if we were deserializing the response
        request.getHeaders().add("Accept", "application/json");

        return execution.execute(request, body);
    }
}
