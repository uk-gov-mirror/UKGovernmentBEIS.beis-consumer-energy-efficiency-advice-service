package uk.gov.beis.dceas.config;

import org.apache.http.client.config.RequestConfig;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.TimeUnit;

/**
 * See https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-resttemplate.html#boot-features-resttemplate-customization
 */
@Configuration
public class HttpClientConfig {

    @Bean
    public HttpComponentsClientHttpRequestFactory requestFactory(
        @Value("${dceas.httpClient.connectTimeoutMs}")
            int connectTimeoutMs,
        @Value("${dceas.httpClient.readTimeoutMs}")
            int readTimeoutMs,
        @Value("${dceas.httpClient.connectionPoolTimeoutMs}")
            int connectionPoolTimeoutMs,
        @Value("${dceas.httpClient.connectionMaxIdleMs}")
            int connectionMaxIdleMs,
        @Value("${dceas.httpClient.maxConnectionsPerRoute}")
            int maxConnectionsPerRoute,
        @Value("${dceas.httpClient.maxConnectionsTotal}")
            int maxConnectionsTotal
    ) {
        CloseableHttpClient client = HttpClientBuilder.create()
            .evictIdleConnections(connectionMaxIdleMs, TimeUnit.MILLISECONDS)
            .setMaxConnPerRoute(maxConnectionsPerRoute)
            .setMaxConnTotal(maxConnectionsTotal)
            .setDefaultRequestConfig(
                RequestConfig.custom()
                    .setConnectTimeout(connectTimeoutMs)
                    .setConnectionRequestTimeout(connectionPoolTimeoutMs)
                    .setSocketTimeout(readTimeoutMs)
                    .build())
            .build();

        return new HttpComponentsClientHttpRequestFactory(client);
    }

    @Bean
    public RestTemplateCustomizer restTemplateCustomizer(ClientHttpRequestFactory requestFactory) {
        return new RestTemplateCustomizer() {
            @Override
            public void customize(RestTemplate restTemplate) {
                restTemplate.setRequestFactory(requestFactory);
            }
        };
    }
}
