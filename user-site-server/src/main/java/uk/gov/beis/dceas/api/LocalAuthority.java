package uk.gov.beis.dceas.api;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Value;

import java.util.List;

@Value
@SuppressWarnings("checkstyle:visibilitymodifier")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class LocalAuthority {
    String localAuthorityCode;
    String displayName;
    List<Grant> grants;

    /**
     * @see NationalGrant
     */
    @Value
    @SuppressWarnings("checkstyle:visibilitymodifier")
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class Grant {
        String displayName;
        String description;
        String eligibilityCriteria;
        String phoneNumber;
        String websiteUrl;
        String endDate;
        String slug;
    }
}
