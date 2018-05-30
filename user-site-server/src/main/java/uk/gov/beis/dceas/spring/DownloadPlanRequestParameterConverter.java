package uk.gov.beis.dceas.spring;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import uk.gov.beis.dceas.controller.EnergySavingPlanController.PlanInfo;

import java.io.IOException;

@Component
public class DownloadPlanRequestParameterConverter
        implements Converter<String, PlanInfo> {

    private final ObjectMapper objectMapper;

    public DownloadPlanRequestParameterConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public PlanInfo convert(String source) {
        try {
            return objectMapper.readValue(source, PlanInfo.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
