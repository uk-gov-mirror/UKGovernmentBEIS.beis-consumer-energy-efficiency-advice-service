package uk.gov.beis.dceas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.time.Clock;
import java.time.Instant;

@SpringBootApplication
public class DceasApplication {

    public static void main(String[] args) {
        // All logs go to stdout, even in production.
        //
        // Cloud Foundry will pipe stdout to the log
        // https://docs.cloudfoundry.org/devguide/deploy-apps/streaming-logs.html
        System.out.println(
            "BEIS DCEAS application starting at " + Instant.now() + ". "
                + "This is the application's `stdout` stream. For the "
                + "application logs, please see /var/log/TODO:BEISDEAS-156-<env>.log"
        );

        SpringApplication.run(DceasApplication.class, args);
    }

    @Bean
    public Clock clock() {
        return Clock.systemUTC();
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }
}
