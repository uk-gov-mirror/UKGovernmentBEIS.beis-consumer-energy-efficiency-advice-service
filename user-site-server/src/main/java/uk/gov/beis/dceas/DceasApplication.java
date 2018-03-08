package uk.gov.beis.dceas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.Instant;

@SpringBootApplication
public class DceasApplication {

    public static void main(String[] args) {
        // The stdout is written to /var/log/*.log
        // See https://docs.spring.io/spring-boot/docs/current/reference/html/deployment-install.html
        // Stdout might look like the primary log file and be confusing, so
        // we'll add a hint pointing admins to the real log file:
        System.out.println(
            "BEIS DCEAS application starting at " + Instant.now() + ". "
                + "This is the application's `stdout` stream. For the "
                + "application logs, please see /var/log/TODO:RTB-<env>.log"
        );

        SpringApplication.run(DceasApplication.class, args);
    }
}
