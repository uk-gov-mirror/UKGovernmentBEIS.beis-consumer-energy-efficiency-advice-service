package uk.gov.beis.dceas.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest("integrationTest=true")
public class DefaultRentalMeasuresServiceTest {

    private static final String RESOURCE_FOLDER_PATH = "uk/gov/beis/dceas/service/DefaultRentalMeasuresService/";
    private static final TypeReference<Map<String, Object>> OBJECT_MAPPER_TYPE_REFERENCE =
            new TypeReference<Map<String, Object>>() {};

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DefaultRentalMeasuresService defaultRentalMeasuresService;

    @SuppressWarnings("unchecked")
    @Test
    public void shouldAddDefaultRentalMeasuresWhenUserIsRentalUserAndNoRentalMeasuresReturned() throws IOException {
        // Given
        String requestJson = loadResourceAsString("request-with-rental-user.json");
        String responseJson = loadResourceAsString("response-without-rental-measures.json");

        // When
        String newResponseJson = defaultRentalMeasuresService.addDefaultRentalMeasuresIfNeeded(responseJson, requestJson);

        // Then
        Map<String, Object> response = getMapFromJsonString(newResponseJson);
        Map<String, Object> defaultRentalMeasures = (Map<String, Object>) response.get("default_rental_measures");
        assertThat(defaultRentalMeasures).containsOnlyKeys("tumble_drying", "baths_to_showers", "one_degree_reduction");
    }

    @Test
    public void shouldReturnTheSameResponseWhenUserIsNotRentalUser() throws IOException {
        // Given
        String requestJson = loadResourceAsString("request-with-non-rental-user.json");
        String responseJson = loadResourceAsString("response-without-rental-measures.json");

        // When
        String newResponseJson = defaultRentalMeasuresService.addDefaultRentalMeasuresIfNeeded(responseJson, requestJson);

        assertThat(newResponseJson).isEqualTo(responseJson);
    }

    @Test
    public void shouldReturnTheSameResponseWhenThereAreRentalMeasuresReturned() throws IOException {
        // Given
        String requestJson = loadResourceAsString("request-with-rental-user.json");
        String responseJson = loadResourceAsString("response-with-rental-measures.json");

        // When
        String newResponseJson = defaultRentalMeasuresService.addDefaultRentalMeasuresIfNeeded(responseJson, requestJson);

        assertThat(newResponseJson).isEqualTo(responseJson);
    }

    public String loadResourceAsString(String filename) throws IOException {
        return Resources.toString( Resources.getResource(RESOURCE_FOLDER_PATH + filename), Charsets.UTF_8);
    }

    public Map<String, Object> getMapFromJsonString(String jsonString) throws IOException {
        return objectMapper.readValue(jsonString, OBJECT_MAPPER_TYPE_REFERENCE);
    }
}
