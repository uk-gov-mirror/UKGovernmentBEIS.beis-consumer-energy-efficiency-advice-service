package uk.gov.beis.dceas.controller;

import com.google.common.collect.Iterables;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.gov.beis.dceas.api.LocalAuthority;
import uk.gov.beis.dceas.db.gen.tables.WpPostmeta;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static java.util.stream.Collectors.toList;
import static org.jooq.impl.DSL.inline;
import static uk.gov.beis.dceas.db.gen.Tables.WP_POSTMETA;
import static uk.gov.beis.dceas.db.gen.Tables.WP_POSTS;
import static uk.gov.beis.dceas.service.AcfDataTranslator.deserializePhpStringArrayOfInts;
import static uk.gov.beis.dceas.service.AcfDataTranslator.toBool;
import static uk.gov.beis.dceas.spring.NotFoundException.notFoundIfNull;

/**
 * Gets Local Authority info from the database.
 *
 * The info is stored as "Posts" in WP, with custom fields in the meta table.
 *
 * TODO:BEIS-214 how does the data get updated?
 */
@RestController
@RequestMapping("/api")
public class LocalAuthorityController {

    private final DSLContext dslContext;

    public LocalAuthorityController(
        DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    /**
     * Gets Local Authority info by ONS code.
     *
     * The info is stored as "Posts" in WP, with custom fields in the meta table.
     */
    @GetMapping("/local-authority/{onsCode}")
    public LocalAuthority get(
        @PathVariable("onsCode") String onsCode) throws IOException {

        // The schema is ugly here, because it was created by ACF, a Wordpress plugin
        // that hacks custom fields into WP by encoding them as posts and post_meta.
        // It would be nice to throw this away and redo as a real database table.
        //
        // The WP PHP code takes 10+ database round trips to read a single entity in
        // this format.

        final WpPostmeta postMetaForCode = WP_POSTMETA.as("post_meta_for_code");
        final WpPostmeta postMetaForGrantsList = WP_POSTMETA.as("post_meta_for_grants_list");
        final WpPostmeta postMetaForDisplayName = WP_POSTMETA.as("post_meta_for_display_name");
        final WpPostmeta postMetaForIsEcoFlexActive = WP_POSTMETA.as("post_meta_for_is_eco_flex_active");
        final WpPostmeta postMetaForEcoFlexFurtherInfoLink = WP_POSTMETA.as("post_meta_for_eco_flex_further_info_link");

        Record localAuthPost = notFoundIfNull(dslContext
            .select(
                postMetaForGrantsList.META_VALUE,
                postMetaForDisplayName.META_VALUE,
                postMetaForIsEcoFlexActive.META_VALUE,
                postMetaForEcoFlexFurtherInfoLink.META_VALUE)
            .from(WP_POSTS)
            .join(postMetaForCode).on(
                postMetaForCode.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForCode.META_KEY.eq(inline("local_authority_code")))
                    .and(postMetaForCode.META_VALUE.eq(onsCode)))

            .leftJoin(postMetaForGrantsList).on(
                postMetaForGrantsList.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForGrantsList.META_KEY.eq(inline("grants"))))
            .leftJoin(postMetaForDisplayName).on(
                postMetaForDisplayName.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForDisplayName.META_KEY.eq(inline("display_name"))))
            .leftJoin(postMetaForIsEcoFlexActive).on(
                postMetaForIsEcoFlexActive.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForIsEcoFlexActive.META_KEY.eq(inline("is_eco_flex_active"))))
            .leftJoin(postMetaForEcoFlexFurtherInfoLink).on(
                postMetaForEcoFlexFurtherInfoLink.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForEcoFlexFurtherInfoLink.META_KEY.eq(inline("eco_flex_further_info_link"))))

            .where(WP_POSTS.POST_TYPE.eq(inline("local_authority")))
            .and(WP_POSTS.POST_STATUS.eq(inline("publish")))
            .groupBy(WP_POSTS.ID)
            .orderBy(WP_POSTS.POST_DATE.desc())
            .fetchOne());

        String grantsListEncoded = postMetaForGrantsList.META_VALUE.get(localAuthPost);
        List<Integer> grantPostIds = deserializePhpStringArrayOfInts(grantsListEncoded);

        List<LocalAuthority.Grant> grants = fetchGrantsByPostIds(grantPostIds);

        boolean isEcoFlexActive = toBool(postMetaForIsEcoFlexActive.META_VALUE.get(localAuthPost));

        // Although the ACF "eco_flex_further_info_link" list is conditional on "is_eco_flex_active",
        // the former value is not cleared in the database when the latter is set to
        // false. To prevent sending stale data, we must guard against that here
        String ecoFlexFurtherInfoLink;
        if (!isEcoFlexActive) {
            ecoFlexFurtherInfoLink = null;
        } else {
            ecoFlexFurtherInfoLink = postMetaForEcoFlexFurtherInfoLink.META_VALUE.get(localAuthPost);
        }

        return new LocalAuthority(
            onsCode,
            postMetaForDisplayName.META_VALUE.get(localAuthPost),
            isEcoFlexActive,
            ecoFlexFurtherInfoLink,
            grants);
    }

    private List<LocalAuthority.Grant> fetchGrantsByPostIds(List<Integer> grantPostIds) {

        final WpPostmeta postMetaForDisplayName = WP_POSTMETA.as("post_meta_for_display_name");
        final WpPostmeta postMetaForDescription = WP_POSTMETA.as("post_meta_for_description");
        final WpPostmeta postMetaForEligibilityCriteria = WP_POSTMETA.as("post_meta_for_eligibility_criteria");
        final WpPostmeta postMetaForPhoneNumber = WP_POSTMETA.as("post_meta_for_phone_number");
        final WpPostmeta postMetaForWebsiteUrl = WP_POSTMETA.as("post_meta_for_website_url");
        final WpPostmeta postMetaForEndDate = WP_POSTMETA.as("post_meta_for_end_date");

        Map<Integer, List<LocalAuthority.Grant>> grants = dslContext
            .select(
                WP_POSTS.ID,
                WP_POSTS.POST_NAME,
                postMetaForDisplayName.META_VALUE,
                postMetaForDescription.META_VALUE,
                postMetaForEligibilityCriteria.META_VALUE,
                postMetaForPhoneNumber.META_VALUE,
                postMetaForWebsiteUrl.META_VALUE,
                postMetaForEndDate.META_VALUE)
            .from(WP_POSTS)

            .leftJoin(postMetaForDisplayName).on(
                postMetaForDisplayName.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForDisplayName.META_KEY.eq("display_name")))
            .leftJoin(postMetaForDescription).on(
                postMetaForDescription.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForDescription.META_KEY.eq("description")))
            .leftJoin(postMetaForEligibilityCriteria).on(
                postMetaForEligibilityCriteria.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForEligibilityCriteria.META_KEY.eq("eligibility_criteria")))
            .leftJoin(postMetaForPhoneNumber).on(
                postMetaForPhoneNumber.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForPhoneNumber.META_KEY.eq("phone_number")))
            .leftJoin(postMetaForWebsiteUrl).on(
                postMetaForWebsiteUrl.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForWebsiteUrl.META_KEY.eq("website_url")))
            .leftJoin(postMetaForEndDate).on(
                        postMetaForEndDate.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForEndDate.META_KEY.eq("end_date")))

            .where(WP_POSTS.ID.in(grantPostIds))
            .and(WP_POSTS.POST_STATUS.eq(inline("publish")))
            .groupBy(WP_POSTS.ID)
            .fetchGroups(
                WP_POSTS.ID,
                r ->
                    new LocalAuthority.Grant(
                        postMetaForDisplayName.META_VALUE.get(r),
                        postMetaForDescription.META_VALUE.get(r),
                        postMetaForEligibilityCriteria.META_VALUE.get(r),
                        postMetaForPhoneNumber.META_VALUE.get(r),
                        postMetaForWebsiteUrl.META_VALUE.get(r),
                        postMetaForEndDate.META_VALUE.get(r),
                        WP_POSTS.POST_NAME.get(r)));

        return grantPostIds.stream()
            .map(grants::get)
            .filter(Objects::nonNull)
            .map(Iterables::getOnlyElement)
            .collect(toList());
    }
}
