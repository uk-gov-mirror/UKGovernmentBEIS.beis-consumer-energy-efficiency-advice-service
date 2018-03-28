package uk.gov.beis.dceas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
            "BEIS DCEAS application starting at " + Instant.now());

        SpringApplication application = new SpringApplication(DceasApplication.class);

        if (System.getenv("VCAP_APPLICATION") == null) {
            System.out.println("No 'VCAP_APPLICATION' env, turning on dev Spring profile");
            application.setAdditionalProfiles("dev");
        }

        application.run(args);
    }

    @Bean
    public Clock clock() {
        return Clock.systemUTC();
    }
}
