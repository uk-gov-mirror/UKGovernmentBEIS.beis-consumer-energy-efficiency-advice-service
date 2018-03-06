package uk.gov.beis.dceas.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

/**
 * Code relating to fetching the Boiler database from
 * http://www.boilers.org.uk/data1/pcdf2012.dat
 */
public class BoilerPcdfDatabaseUpdateService {

    private final RestTemplate httpClient;

    private final String databaseUrl;

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    public BoilerPcdfDatabaseUpdateService(
        RestTemplate httpClient,
        @Value("dceas.boiler-pcdf-database-url") String databaseUrl) {
        this.httpClient = httpClient;
        this.databaseUrl = databaseUrl;
    }

    public void updateDatabase() {
        String databaseContent = httpClient.getForObject(databaseUrl, String.class);

        // TODO:BEIS-158 fetch, parse and save the boilers
        log.info(databaseContent.substring(0, 2000));
    }
}
