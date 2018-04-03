package uk.gov.beis.dceas.service;

import com.google.common.io.Resources;
import org.jooq.DSLContext;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;
import uk.gov.beis.dceas.api.Boiler;
import uk.gov.beis.dceas.controller.BoilerController;

import java.nio.charset.Charset;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest("integrationTest=true")
public class BoilerPcdfDatabaseUpdateServiceTest {

    @Autowired
    private BoilerController boilerController;

    @Autowired
    private DSLContext database;

    @Test
    public void ingestSavedBoilerDatabase() throws Exception {
        // Arrange
        String databaseUrl = "http://example.com/pcdf2012.dat";
        RestTemplate httpClient = mock(RestTemplate.class);
        when(httpClient.getForObject(databaseUrl, String.class))
            .thenReturn(Resources.toString(
                getClass().getResource("pcdf2012.dat"),
                Charset.defaultCharset()));
        RestTemplateBuilder restTemplateBuilder = mock(RestTemplateBuilder.class);
        when(restTemplateBuilder.build()).thenReturn(httpClient);

        BoilerPcdfDatabaseUpdateService service =
            new BoilerPcdfDatabaseUpdateService(
                restTemplateBuilder,
                databaseUrl,
                database);

        // Act
        service.updateDatabase();

        // Assert
        Boiler boiler = boilerController.getByProductIndexNumber("017137");
        assertThat(boiler.getName())
            .isEqualTo("Worcester - Greenstar Heatslave II, 18/25");
        assertThat(boiler.getSap2005SeasonalEfficiency())
            .isEqualTo("90.2");
    }
}
