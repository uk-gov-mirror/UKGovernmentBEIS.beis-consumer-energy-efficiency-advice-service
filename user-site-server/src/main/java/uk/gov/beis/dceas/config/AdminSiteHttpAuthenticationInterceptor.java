package uk.gov.beis.dceas.config;

import com.github.mkopylec.charon.core.http.ForwardedRequestInterceptor;
import com.github.mkopylec.charon.core.http.RequestData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.nio.charset.StandardCharsets.UTF_8;

/**
 * This interceptor adds our shared secret to all HTTP requests to the
 * admin-site that we make via the Charon reverse-proxy
 * (configured in application-cloud.properties)
 */
@Component
public class AdminSiteHttpAuthenticationInterceptor
        implements ForwardedRequestInterceptor {

    private final String apiAuthHeaderValue;

    public AdminSiteHttpAuthenticationInterceptor(
            @Value("${vcap.services.dceas-admin-logins.config.credentials.user-site}")
                    String password) {

        if (isNullOrEmpty(password)) {
            apiAuthHeaderValue = null;
        } else {
            this.apiAuthHeaderValue =
                    "Basic " + Base64.getEncoder().encodeToString(
                            ("user-site:" + password).getBytes(UTF_8));
        }
    }

    @Override
    public void intercept(RequestData data) {
        if (apiAuthHeaderValue != null) {
            data.getHeaders().add("Authorization", apiAuthHeaderValue);
        }
    }
}
