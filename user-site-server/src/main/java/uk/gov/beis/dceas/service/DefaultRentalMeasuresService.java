package uk.gov.beis.dceas.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public class DefaultRentalMeasuresService {

    private static final TypeReference<Map<String, Object>> STRING_OBJECT_MAP_TYPE =
            new TypeReference<Map<String, Object>>() { };

    private final ObjectMapper objectMapper;

    public DefaultRentalMeasuresService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public String addDefaultRentalMeasuresIfNeeded(String responseJson, String requestJson) throws IOException {
        Map<String, Object> request = objectMapper.readValue(requestJson, STRING_OBJECT_MAP_TYPE);
        Map<String, Object> response = objectMapper.readValue(responseJson, STRING_OBJECT_MAP_TYPE);

        if (!userIsRenting(request) || responseHasRentalMeasures(response)) {
            return responseJson;
        }

        Map<String, Object> responseWithDefaultRentalMeasures = getResponseWithDefaultRentalMeasures(response);
        return objectMapper.writeValueAsString(responseWithDefaultRentalMeasures);
    }

    private boolean userIsRenting(Map<String, Object> request) throws IOException {
        return Boolean.parseBoolean(request.get("rented").toString());
    }

    private boolean responseHasRentalMeasures(Map<String, Object> response) throws IOException {
        return response.get("measures_rented") != null;
    }

    private Map<String, Object> getResponseWithDefaultRentalMeasures(Map<String, Object> response) throws IOException {
        Map<String, Object> defaultRentalMeasures = getDefaultRentalMeasures();
        response.put("default_rental_measures", defaultRentalMeasures);
        return response;
    }

    private Map<String, Object> getDefaultRentalMeasures() throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        String defaultRentalMeasuresJson = IOUtils.toString(classLoader.getResourceAsStream("default-rental-measures.json"), Charsets.UTF_8);
        return objectMapper.readValue(defaultRentalMeasuresJson, STRING_OBJECT_MAP_TYPE);
    }
}
