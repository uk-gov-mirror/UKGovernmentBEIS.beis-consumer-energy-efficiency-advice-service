package uk.gov.beis.dceas.config;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

@Configuration
public class NotFoundConfig {

    @Bean
    public EmbeddedServletContainerCustomizer notFoundCustomizer() {
        return new NotFoundIndexTemplate();
    }

    /**
     * We render the Angular homepage as a custom 404 page.
     *
     * Programmatic clients (like AJAX fetches) will see the 404 code and ignore the
     * HTML body with its javascript includes.
     * Browser clients (users) will see the pretty Angular "page not found" content.
     */
    private static class NotFoundIndexTemplate implements EmbeddedServletContainerCustomizer {
        @Override
        public void customize(ConfigurableEmbeddedServletContainer container) {
            container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/"));
        }
    }
}
