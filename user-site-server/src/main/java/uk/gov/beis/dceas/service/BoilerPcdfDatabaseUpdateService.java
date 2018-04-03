package uk.gov.beis.dceas.service;

import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import uk.gov.beis.dceas.db.gen.tables.records.BoilersRecord;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static uk.gov.beis.dceas.db.gen.Tables.BOILERS;

/**
 * Code relating to fetching the Boiler database from
 * http://www.boilers.org.uk/data1/pcdf2012.dat
 */
@Service
public class BoilerPcdfDatabaseUpdateService {

    /**
     * See Section 6.1 of the format doc
     */
    private static final int GAS_AND_OIL_BOILER_TABLE_ID = 105;

    /**
     * See Section 6.1 of the format doc
     */
    private static final int GAS_AND_OIL_BOILER_TABLE_FORMAT_ID = 210;

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final RestTemplate httpClient;

    private final String databaseUrl;

    private final DSLContext database;

    @Autowired
    public BoilerPcdfDatabaseUpdateService(
        RestTemplateBuilder httpClientBuilder,
        @Value("${dceas.boiler-pcdf-database-url}") String databaseUrl,
        DSLContext database) {

        this.httpClient = httpClientBuilder.build();
        this.databaseUrl = databaseUrl;
        this.database = database;
    }

    /**
     * The spec for the data file is given in "PCDF_Spec_Rev-06a_Apr_2014.pdf"
     */
    public void updateDatabase() throws IOException {
        String databaseContent = httpClient.getForObject(databaseUrl, String.class);
        BufferedReader in = new BufferedReader(new StringReader(databaseContent));
        Pattern controlLinePattern = Pattern.compile(
            "\\$(\\d+),(?:(\\d+),).*");

        int tableId = -1;
        int tableFormatId = -1;
        List<BoilersRecord> boilers = new ArrayList<>();

        String line;
        while ((line = in.readLine()) != null) {
            if (line.startsWith("#")) {
                continue; // file comment
            }

            if ("$999".equals(line)) {
                // "End of file. The receiving program should not read beyond this point"
                break;
            }

            // The data file contains a number of tables.
            // The start of table is indicated by a 'control line' which begins with $X,Y
            // where X is the table number and Y is the data format number
            // The succeeding lines (which do not begin with $) form the table body
            // The table is terminated by the next line which begins with $

            // "Any of the tables may appear more than once; see rules in A.7.
            // In particular, if a table has two or more occurrences with the same format
            // number each instance is read and their contents merged"

            if (line.startsWith("$")) {
                Matcher m = controlLinePattern.matcher(line);
                if (!m.matches()) {
                    throw new IllegalArgumentException(
                        "Unrecognised control line format: \"" + line + "\"");
                }

                tableId = Integer.parseInt(m.group(1));
                tableFormatId = m.group(2) == null ? -1 : Integer.parseInt(m.group(2));
            } else {
                // Not a control line, not a comment, so this is a data line

                if (tableId == GAS_AND_OIL_BOILER_TABLE_ID) {
                    if (tableFormatId != GAS_AND_OIL_BOILER_TABLE_FORMAT_ID) {
                        throw new IllegalArgumentException(
                            "Unrecognised PCDF table format: " + tableFormatId);
                    }

                    boilers.add(parseBoilerTableRow(line));
                }
            }
        }

        if (boilers.isEmpty()) {
            throw new IllegalArgumentException(
                "No boiler data found in the file");
        }

        database.transaction(t -> {
            DSL.using(t)
                .deleteFrom(BOILERS)
                .execute();

            DSL.using(t)
                .batchInsert(boilers)
                .execute();
        });
    }

    /**
     * See format 210 in Section A.10 of the spec pdf
     */
    private BoilersRecord parseBoilerTableRow(String line) {
        // See section A.5:
        // "No item of data will contain an embedded comma."
        String[] cols = line.split(",");

        String productIndexNumber = cols[0];
        String brandName = cols[5];
        String modelName = cols[6];
        String modelQualifier = cols[7];
        String sap2005SeasonalEfficiency = cols[29];
        String fuel = cols[11];

        String name = String.format(
            "%s - %s, %s",
            brandName,
            modelName,
            modelQualifier);

        BoilersRecord r = new BoilersRecord();
        r.setProductIndexNumber(productIndexNumber);
        r.setName(name);
        r.setSap_2005SeasonalEfficiency(sap2005SeasonalEfficiency);
        r.setFuel(fuel);
        return r;
    }
}
