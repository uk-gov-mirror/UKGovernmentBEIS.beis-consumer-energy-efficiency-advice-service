package uk.gov.beis.dceas.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Value;

import java.util.List;

@Value
@SuppressWarnings("checkstyle:visibilitymodifier")
public class LocalAuthority {
    @JsonProperty("local_authority_code")
    String localAuthorityCode;
    @JsonProperty("display_name")
    String displayName;
    @JsonProperty("is_eco_flex_active")
    Boolean isEcoFlexActive;
    @JsonProperty("eco_flex_further_info_link")
    String ecoFlexFurtherInfoLink;
    List<Grant> grants;

    @Value
    @SuppressWarnings("checkstyle:visibilitymodifier")
    public static class Grant {
        @JsonProperty("display_name")
        String displayName;
        String description;
        String slug;
    }
}
