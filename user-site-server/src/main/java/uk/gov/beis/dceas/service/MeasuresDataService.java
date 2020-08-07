package uk.gov.beis.dceas.service;

import com.google.common.base.Strings;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static com.google.common.base.Preconditions.checkArgument;

/**
 * This service caches data on Measures which is stored by the Admin site
 * and rendered as JSON by Wordpress ACF.
 */
@Service
public class MeasuresDataService {

    private static final String WP_API_URL = "/wp-json/acf/v3/measure?per_page=1000";
    private static final Object KEY = new Object();
    /**
     * We lean on Guava to give us a simple thread-safe expiring cache for the JSON
     * (with coalescing reads on expiry)
     */
    private final LoadingCache<Object, Map<String, Map<String, Object>>> measuresBySlugCache =
            CacheBuilder.newBuilder()
                    .expireAfterWrite(1, TimeUnit.HOURS)
                    .build(new MeasuresBySlugFetcher());

    private final Environment environment;
    private final RestTemplate httpClient;

    public MeasuresDataService(
            Environment environment,
            RestTemplateBuilder httpClientBuilder,
            @Value("${vcap.services.user-site-auth.credentials.username}") String username,
            @Value("${vcap.services.user-site-auth.credentials.password}") String password) {
        this.environment = environment;
        if (!Strings.isNullOrEmpty(username) && !Strings.isNullOrEmpty(password)) {
            httpClientBuilder = httpClientBuilder.basicAuthorization(username, password);
        }
        this.httpClient = httpClientBuilder.build();
    }

    public Map<String, Map<String, Object>> getMeasuresBySlug() throws Exception {
        return measuresBySlugCache.get(KEY);
    }

    private class MeasuresBySlugFetcher extends CacheLoader<Object, Map<String, Map<String, Object>>> {
        @Override
        public Map<String, Map<String, Object>> load(Object key) throws Exception {
            checkArgument(key == KEY);

            // We query the Admin site HTTPS interface by making an HTTP request to
            // ourselves (i.e this Spring Boot webapp), because we need the Charon
            // reverse-proxy filter to add authentication.
            // I could not find a non-hacky way of invoking the Charon filter directly.
            // This request will be cached here, so performance isn't a big concern.
            String port = environment.getProperty("local.server.port");

            List<Map<String, Object>> measuresJson =
                    httpClient.getForObject(
                            "http://localhost:" + port + WP_API_URL,
                            List.class);

            Map<String, Map<String, Object>> measuresById = new HashMap<>();
            for (Map<String, Object> measure : measuresJson) {
                measuresById.put(
                        (String) measure.get("slug"),
                        measure);
            }
            return measuresById;
        }
    }
}
