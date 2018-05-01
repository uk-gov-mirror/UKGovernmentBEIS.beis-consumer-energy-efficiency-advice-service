package uk.gov.beis.dceas.api;

import com.fasterxml.jackson.databind.PropertyNamingStrategy.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Value;

import java.util.List;

/**
 * @see uk.gov.beis.dceas.api.LocalAuthority.Grant
 */
@Value
@Builder
@SuppressWarnings("checkstyle:visibilitymodifier")
@JsonNaming(SnakeCaseStrategy.class)
public class NationalGrant {

    String heading;
    String description;
    Boolean linkToMeasures;
    Boolean displayWithoutMeasures;
    List<String> advantages;
    List<Step> steps;
    List<String> linkedMeasureCodes;
    String slug;

    @Value
    @Builder
    @SuppressWarnings("checkstyle:visibilitymodifier")
    @JsonNaming(SnakeCaseStrategy.class)
    public static class Step {
        String headline;
        String description;
        String readMore;
        List<Link> moreInfoLinks;
    }

    @Value
    @Builder
    @SuppressWarnings("checkstyle:visibilitymodifier")
    @JsonNaming(SnakeCaseStrategy.class)
    public static class Link {
        String buttonText;
        String linkUrl;
    }
}
