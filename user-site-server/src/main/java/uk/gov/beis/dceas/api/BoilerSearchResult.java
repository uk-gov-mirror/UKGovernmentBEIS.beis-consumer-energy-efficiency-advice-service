package uk.gov.beis.dceas.api;

import lombok.Value;

import java.util.List;

@Value
@SuppressWarnings("checkstyle:visibilitymodifier")
public class BoilerSearchResult {
    List<Boiler> results;
}
