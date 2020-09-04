package uk.gov.beis.dceas.service;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import lombok.Builder;
import org.quartz.utils.FindbugsSuppressWarnings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import uk.gov.beis.dceas.exception.InstallerSearchException;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class InstallerSearchService {
    private final Integer numberOfItemsPerPage = 20;
    private final String searchUrl;
    private final String idServerUrl;
    private final String clientId;
    private final String clientSecret;
    private final RestTemplate restTemplate;
    private final LoadingCache<String, String> accessTokenCache = CacheBuilder
            .newBuilder()
            // Trustmark token is valid for 1 hour. To be safe, we request a new one after 55 minutes.
            .expireAfterWrite(55, TimeUnit.MINUTES)
            .build(getAccessToken());
    private static final Pattern NOT_FOR_PUBLIC_USE = Pattern.compile("^TrustMark (.*\\(Not For Public Use\\).*)|(.*Demo.*)$", Pattern.CASE_INSENSITIVE);
    private final Logger log = LoggerFactory.getLogger(getClass());

    public InstallerSearchService(
            @Value("${vcap.services.trustMark.credentials.search.url}")
                    String searchUrl,
            @Value("${vcap.services.trustMark.credentials.idServer.url}")
                    String idServerUrl,
            @Value("${vcap.services.trustMark.credentials.idServer.clientId}")
                    String clientId,
            @Value("${vcap.services.trustMark.credentials.idServer.clientSecret}")
                    String clientSecret,
            RestTemplateBuilder restTemplateBuilder) {
        this.searchUrl = searchUrl;
        this.idServerUrl = idServerUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.restTemplate = restTemplateBuilder.build();
    }

    public TrustMarkSearchResponse findInstallers(
            String postcode,
            String[] tradecodes,
            Integer page) throws InstallerSearchException {
        try {
            String accessToken = accessTokenCache.get("Trustmark Access Token");
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            HttpEntity<?> entity = new HttpEntity<>(headers);
            // We need to wrap in new URI() rather than using the string to prevent double encoding of spaces in the
            // postcode. Without this, postcode parameters come out as (e.g.) NW5%25201TL instead of NW5%201TL.
            URI url = new URI(UriComponentsBuilder.fromHttpUrl(searchUrl)
                    .queryParam("postcode", formatPostcode(postcode))
                    .queryParam("tradecodes", (Object[]) tradecodes)
                    .queryParam("pageNumber", page)
                    .queryParam("pageSize", numberOfItemsPerPage)
                    .toUriString());
            TrustMarkSearchResponse response = restTemplate.exchange(url, HttpMethod.GET, entity, TrustMarkSearchResponse.class).getBody();
            return getPublicUseInstallersFilteredResponse(response);
        } catch (ExecutionException e) {
            throw new InstallerSearchException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to fetch Trustmark access token from cache."
            );
        } catch (HttpStatusCodeException e) {
            throw new InstallerSearchException(
                    e.getStatusCode(),
                    "Failed to fetch data for postcode " + postcode +
                            " and tradecodes " + String.join(", ", tradecodes) +
                            " from the Trustmark API. Response: " + e.getResponseBodyAsString()
            );
        } catch (URISyntaxException e) {
            throw new InstallerSearchException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Invalid URI syntax for Trustmark request: " + e.getReason()
            );
        }
    }

    private String formatPostcode(String postcode) {
        String stripped = postcode.replace(" ", "");
        return stripped.substring(0, stripped.length() - 3) + " " + stripped.substring(stripped.length() - 3);
    }

    private CacheLoader<String, String> getAccessToken() {
        return new CacheLoader<String, String>() {
            @Override
            public String load(String key) {
                LinkedMultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
                formData.add("client_id", clientId);
                formData.add("client_secret", clientSecret);
                formData.add("grant_type", "client_credentials");
                formData.add("scope", "TrustMark.WebApi");
                TrustMarkIdResponse response = restTemplate.postForObject(idServerUrl, formData, TrustMarkIdResponse.class);
                return response.getAccessToken();
            }
        };
    }

    /* Trustmark's API may return installers that are not meant for public use. They use these for testing, thus we should filter
    them out. There's about 11 of them, and they should all match the NOT_FOR_PUBLIC_USE regex pattern. This means that we may
    not always return 20 installers per page. There's a few edge cases that can happen in the frontend, all rooted in the fact that we might
    return an empty page (if all the 20 installers returned by Trustmark are invalid) but these are relatively 
    rare since the number of Not For Public Use installers is small relative to the page size (currently 20). Moreover, since these invalid
    installers have different trade codes, it is even less likely for several of them to be returned. Given how it is unlikely that we return
    an empty page (only truly a severe error if this is not the last page), or even impossible (since the first and middle pages have 20 items,
    and there's only 11 invalid installers), we've decided not to implement a workaround to overcome this edge case. This would be a faff and we
    would end up with a more error prone and less readable code */
    private TrustMarkSearchResponse getPublicUseInstallersFilteredResponse(TrustMarkSearchResponse response) {
            List<TrustMarkInstaller> filteredInstallers = response.data.stream().filter(
                installer -> !NOT_FOR_PUBLIC_USE.matcher(installer.registeredName).find()
            ).collect(Collectors.toList());

        return new TrustMarkSearchResponse(response.paginator, response.errorMessage, filteredInstallers);
    }

    @lombok.Value
    @Builder
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    @SuppressWarnings("checkstyle:visibilitymodifier")
    public static class TrustMarkIdResponse {
        String accessToken;
        String expiresIn;
        String tokenType;
        String scope;
    }

    @lombok.Value
    @Builder
    @SuppressWarnings("checkstyle:visibilitymodifier")
    @FindbugsSuppressWarnings
    public static class TrustMarkInstaller {
        String address1;
        String address2;
        String country;
        String county;
        String description;
        double distance;
        double distanceInMiles;
        Integer id;
        double latitude;
        double longitude;
        String logoUrl;
        String publicBranchUrl;
        String town;
        Integer trustMarkLicenseNumber;
        String webAddress;
        String registeredName;
        String phoneNumber;
        String email;
   }

    @lombok.Value
    @Builder
    @SuppressWarnings("checkstyle:visibilitymodifier")
    public static class TrustMarkPaginator {
        Integer pageNumber;
        Integer pageSize;
        Integer totalCount;
    }

    @lombok.Value
    @Builder
    @SuppressWarnings("checkstyle:visibilitymodifier")
    public static class TrustMarkSearchResponse {
        TrustMarkPaginator paginator;
        String errorMessage;
        List<TrustMarkInstaller> data;
    }
}
