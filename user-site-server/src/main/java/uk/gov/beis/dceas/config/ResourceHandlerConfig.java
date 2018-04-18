package uk.gov.beis.dceas.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.GzipResourceResolver;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.time.Duration;
import static java.time.temporal.ChronoUnit.DAYS;

import uk.gov.beis.dceas.spring.Interceptor;

@Configuration
public class ResourceHandlerConfig extends WebMvcConfigurerAdapter {

    private final Logger log = LoggerFactory.getLogger(getClass());
    private final Environment environment;

    public ResourceHandlerConfig(Environment environment) {
        this.environment = environment;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        boolean isDev = environment.acceptsProfiles("dev");
        boolean cacheResourceLookupResults = !isDev;

        ResourceHandlerRegistration config = registry
                .addResourceHandler("/**");

        if (isDev) {
            // On a dev machine, we serve the Angular from the filesystem,
            // rather than from Java classpath.
            // This means that it will update as soon as the file is updated.
            // The official solution to this requires that you rebuild the project to update
            // the classes/ dir, which is not practical when we are using "npm".
            // See https://github.com/spring-projects/spring-boot/issues/5136
            log.warn("Dev mode: Serving static files from src/ dir, for live reloading");
            config.addResourceLocations(
                    "file:user-site-server/src/main/resources/public/");

            // If on a dev machine, add an interceptor which adds a 500ms delay
            addInterceptors(new InterceptorRegistry());
        } else {
            config.addResourceLocations("classpath:/public/");
            // Browser cache:
            config.setCachePeriod((int) Duration.of(365, DAYS).getSeconds());
        }

        config
                .resourceChain(cacheResourceLookupResults)
                .addResolver(new GzipResourceResolver())
                .addResolver(new PathResourceResolver());
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(new Interceptor());
    }
}
