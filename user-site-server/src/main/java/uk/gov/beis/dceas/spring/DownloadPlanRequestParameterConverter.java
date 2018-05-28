package uk.gov.beis.dceas.spring;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import uk.gov.beis.dceas.controller.EnergySavingPlanController.DownloadPlanRequest;

import java.io.IOException;

@Component
public class DownloadPlanRequestParameterConverter
        implements Converter<String, DownloadPlanRequest> {

    private final ObjectMapper objectMapper;

    public DownloadPlanRequestParameterConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public DownloadPlanRequest convert(String source) {
        try {
            return objectMapper.readValue(source, DownloadPlanRequest.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
