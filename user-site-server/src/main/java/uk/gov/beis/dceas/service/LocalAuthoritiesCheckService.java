package uk.gov.beis.dceas.service;

import org.jooq.DSLContext;
import org.jooq.Record;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import uk.gov.beis.dceas.api.LocalAuthority;
import uk.gov.beis.dceas.api.PostcodesResponse;
import uk.gov.beis.dceas.db.gen.tables.WpPostmeta;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static org.jooq.impl.DSL.inline;
import static uk.gov.beis.dceas.db.gen.Tables.WP_POSTMETA;
import static uk.gov.beis.dceas.db.gen.Tables.WP_POSTS;

/**
 * Code relating to checking the Local Authorities by example postcodes against http://postcodes.io/
 */
@Service
public class LocalAuthoritiesCheckService {

    private final Logger log = LoggerFactory.getLogger(getClass());
    private final RestTemplate httpClient;
    private final String postcodesUrl;
    private final DSLContext database;

    @Autowired
    public LocalAuthoritiesCheckService(
        RestTemplateBuilder httpClientBuilder,
        @Value("${dceas.postcodes-url}") String postcodesUrl,
        DSLContext database) {

        this.httpClient = httpClientBuilder.build();
        this.postcodesUrl = postcodesUrl;
        this.database = database;
    }

    public void checkLocalAuthorities() throws RestClientException {
        Map<String, LocalAuthority> localAuthorityByPostcode = getLocalAuthorityByPostcode();
        if (localAuthorityByPostcode.isEmpty()) {
            // No example postcodes provided.
            return;
        }

        PostcodesResponse response = getPostcodesResponse(localAuthorityByPostcode.keySet());
        if (response == null || response.getStatus() != 200) {
            // TODO.
            return;
        }

        for (PostcodesResponse.QueryResult queryResult : response.getResult()) {
            String queryPostcode = queryResult.getQuery();
            PostcodesResponse.QueryResult.Postcode postcodeResult = queryResult.getResult();
            LocalAuthority localAuthority = localAuthorityByPostcode.get(queryPostcode);
            if (!isMatch(postcodeResult, localAuthority)) {
                // TODO.
                log.debug("MISMATCH!");
            }
        }
    }

    private Map<String, LocalAuthority> getLocalAuthorityByPostcode() {
        final WpPostmeta postMetaForExamplePostcode = WP_POSTMETA.as("post_meta_for_example_postcode");
        final WpPostmeta postMetaForCode = WP_POSTMETA.as("post_meta_for_code");
        final WpPostmeta postMetaForDisplayName = WP_POSTMETA.as("post_meta_for_display_name");

        Record[] localAuthorityPosts = database
            .select(
                postMetaForExamplePostcode.META_VALUE,
                postMetaForCode.META_VALUE,
                postMetaForDisplayName.META_VALUE)
            .from(WP_POSTS)
            .join(postMetaForExamplePostcode).on(
                postMetaForExamplePostcode.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForExamplePostcode.META_KEY.eq(inline("example_postcode"))))
            .leftJoin(postMetaForCode).on(
                postMetaForCode.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForCode.META_KEY.eq(inline("local_authority_code"))))
            .leftJoin(postMetaForDisplayName).on(
                postMetaForDisplayName.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForDisplayName.META_KEY.eq(inline("display_name"))))
            .where(WP_POSTS.POST_TYPE.eq(inline("local_authority")))
            .and(WP_POSTS.POST_STATUS.eq(inline("publish")))
            .fetchArray();

        return Arrays.stream(localAuthorityPosts)
            .collect(Collectors.toMap(
                postMetaForExamplePostcode.META_VALUE::get,
                post -> new LocalAuthority(
                    postMetaForCode.META_VALUE.get(post),
                    postMetaForDisplayName.META_VALUE.get(post),
                    postMetaForExamplePostcode.META_VALUE.get(post),
                    null
                )));
    }

    private PostcodesResponse getPostcodesResponse(Set<String> postcodes) {
        Map<String, Object> postBody = new HashMap<>();
        postBody.put("postcodes", postcodes);
        return httpClient.postForObject(postcodesUrl, postBody, PostcodesResponse.class);
    }

    private Boolean isMatch(PostcodesResponse.QueryResult.Postcode postcodeResult, LocalAuthority localAuthority) {
        if (postcodeResult == null) {
            return false;
        }
        return localAuthority.getDisplayName().equals(postcodeResult.getAdminDistrict())
            && localAuthority.getLocalAuthorityCode().equals(postcodeResult.getCodes().getAdminDistrict());
    }
}
