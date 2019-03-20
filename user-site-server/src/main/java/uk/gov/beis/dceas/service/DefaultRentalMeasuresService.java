package uk.gov.beis.dceas.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.Map;

@Service
public class DefaultRentalMeasuresService {

    private static final String REQUEST_RENTED_PROPERTY = "rented";
    private static final String RESPONSE_RENTAL_MEASURES = "measures_rented";
    private static final String RESPONSE_DEFAULT_RENTAL_MEASURES = "default_rental_measures";
    private static final TypeReference<Map<String, Object>> OBJECT_MAPPER_TYPE_REFERENCE =
            new TypeReference<Map<String, Object>>() {};

    private final ObjectMapper objectMapper;

    public DefaultRentalMeasuresService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public String addDefaultRentalMeasuresIfNeeded(String responseJson, String requestJson) throws IOException {
        if (!userIsRenting(requestJson) || responseHasRentalMeasures(responseJson)) {
            return responseJson;
        }

        return getResponseWithDefaultRentalMeasures(responseJson);
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
        Map<String, Object> defaultRentalMeasures = getDefaultRentalMeasures();
        response.put(RESPONSE_DEFAULT_RENTAL_MEASURES, defaultRentalMeasures);
        return objectMapper.writeValueAsString(response);
    }

    private Map<String, Object> getDefaultRentalMeasures() throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        String defaultRentalMeasuresJson = IOUtils.toString(classLoader.getResourceAsStream("default-rental-measures.json"), Charsets.UTF_8);
        return objectMapper.readValue(defaultRentalMeasuresJson, OBJECT_MAPPER_TYPE_REFERENCE);
    }
}
