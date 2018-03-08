package uk.gov.beis.dceas.api;

import lombok.Value;
import uk.gov.beis.dceas.db.gen.tables.records.BoilersRecord;

/**
 * API class for a boiler
 *
 * Corresponds to BoilerJson in gas-and-oil-boilers.service.ts
 */
@Value
@SuppressWarnings("checkstyle:visibilitymodifier")
public class Boiler {
    String productIndexNumber;
    String name;
    String sap2005SeasonalEfficiency;
    String fuel;

    public static Boiler fromDb(BoilersRecord record) {
        return new Boiler(
            record.getProductIndexNumber(),
            record.getName(),
            record.getSap_2005SeasonalEfficiency(),
            record.getFuel());
    }
}
