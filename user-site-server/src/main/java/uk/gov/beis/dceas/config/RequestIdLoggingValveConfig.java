package uk.gov.beis.dceas.config;

import org.apache.catalina.Valve;
import org.apache.catalina.connector.Request;
import org.apache.catalina.connector.Response;
import org.apache.catalina.valves.ValveBase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.ServletException;
import java.io.IOException;

import static com.google.common.base.Strings.isNullOrEmpty;

/**
 * Adds the Cloudfoundry request id to the logging MDC.
 *
 * This is implemented as a Tomcat Valve, rather than a Servlet Filter,
 * because the uncaught error logging is done by Tomcat's StandardWrapperValve,
 * which is outside of the Filter chain.
 */
@Configuration
public class RequestIdLoggingValveConfig {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Bean
    public EmbeddedServletContainerCustomizer containerCustomizer() {
        return (ConfigurableEmbeddedServletContainer container) -> {
            if (container instanceof TomcatEmbeddedServletContainerFactory) {
                TomcatEmbeddedServletContainerFactory tomcat = (TomcatEmbeddedServletContainerFactory) container;

                tomcat.addContextCustomizers((context) ->
                        context.getPipeline().addValve(
                                new RequestIdLoggingValve()));
            } else {
                log.warn("no RequestId logging auto-configuration for container: {}", container);
            }
        };
    }

    private static class RequestIdLoggingValve extends ValveBase {

        private static final String REQUEST_ID_MDC_KEY = "rid";

        @Override
        public void invoke(Request request, Response response) throws IOException, ServletException {
            // The Cloudfoundry PaaS adds a request id to all requests, which
            // can be used for log correlation.
            // See https://github.com/cloudfoundry/gorouter/pull/29
            // We should include it in our logs.
            String requestId = request.getHeader("X-Vcap-Request-Id");
            if (isNullOrEmpty(requestId)) {
                requestId = request.getHeader("X-Request-Id");
            }
            if (isNullOrEmpty(requestId)) {
                invokeNext(request, response);
            } else {
                try (MDC.MDCCloseable ignored = MDC.putCloseable(REQUEST_ID_MDC_KEY, requestId)) {
                    invokeNext(request, response);
                }
            }
        }

        private void invokeNext(Request request, Response response) throws IOException, ServletException {
            Valve next = getNext();
            if (null == next) {
                return;
            }
            next.invoke(request, response);
        }
    }
}
