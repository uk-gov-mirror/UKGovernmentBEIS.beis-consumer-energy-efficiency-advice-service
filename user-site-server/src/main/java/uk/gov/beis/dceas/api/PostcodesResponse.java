package uk.gov.beis.dceas.api;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Value;

@Value
@SuppressWarnings("checkstyle:visibilitymodifier")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
/*
 * Shape of POST response from https://api.postcodes.io/postcodes
 * See: http://postcodes.io/
 */
public class PostcodesResponse {
    private Integer status;
    private QueryResult[] result;

    @Value
    @SuppressWarnings("checkstyle:visibilitymodifier")
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class QueryResult {
        private String query;
        private Postcode result;

        @Value
        @SuppressWarnings("checkstyle:visibilitymodifier")
        @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
        public static class Postcode {
            private String postcode;
            private Integer quality;
            private Integer eastings;
            private Integer northings;
            private String country;
            private String nhsHa;
            private Double longitude;
            private Double latitude;
            private String europeanElectoralRegion;
            private String primaryCareTrust;
            private String region;
            private String lsoa;
            private String msoa;
            private String incode;
            private String outcode;
            private String parliamentaryConstituency;
            private String adminDistrict;
            private String parish;
            private String adminCounty;
            private String adminWard;
            private String ced;
            private String ccg;
            private String nuts;
            private Codes codes;

            @Value
            @SuppressWarnings("checkstyle:visibilitymodifier")
            @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
            public static class Codes {
                private String adminDistrict;
                private String adminCounty;
                private String adminWard;
                private String parish;
                private String parliamentaryConstituency;
                private String ccg;
                private String ced;
                private String nuts;
            }
        }
    }
}
