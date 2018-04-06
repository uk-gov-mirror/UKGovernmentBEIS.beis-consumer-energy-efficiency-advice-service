package uk.gov.beis.dceas.service;

import org.jooq.DSLContext;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.util.Collections.emptyList;
import static org.jooq.impl.DSL.inline;
import static uk.gov.beis.dceas.db.gen.Tables.WP_POSTS;

@Service
public class AcfDataTranslator {

    /**
     * See https://stackoverflow.com/questions/14297926/structure-of-a-serialized-php-string
     *
     * If we need more complex PHP deserialization, consider
     * https://github.com/ironpinguin/serialized-php-parser
     *
     * This matches an array containing Strings which contain numbers.
     */
    private static final Pattern PHP_SERIALIZED_ARRAY_PAT = Pattern.compile(
        "a:(?<arrlen>\\d+):\\{(?<contents>.*)}");

    private static final Pattern PHP_SERIALIZED_ARRAY_ENTRY_PAT = Pattern.compile(
        "\\Gi:(?<key>\\d+);s:(?<valstrlen>\\d+):\"(?<valstrdata>\\d+)\";");

    private final DSLContext dslContext;

    public AcfDataTranslator(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    /**
     * Reads an ACF field of type "repeater" out of a post's meta fields and
     * calls the `childBuilder` function on each child object.
     */
    public static <T> List<T> getAcfRepeaterList(
        Map<String, String> metaFields,
        String repeaterFieldName,
        Function<Map<String, String>, T> childBuilder) {

        int childCount = Integer.parseInt(metaFields.getOrDefault(repeaterFieldName, "0"));

        List<T> acc = new ArrayList<>();
        for (int i = 0; i < childCount; i++) {
            Map<String, String> childFields = new HashMap<>();
            String childPrefix = String.format("%s_%s_", repeaterFieldName, i);
            for (Map.Entry<String, String> metaField : metaFields.entrySet()) {
                if (metaField.getKey().startsWith(childPrefix)) {
                    childFields.put(
                        metaField.getKey().substring(childPrefix.length()),
                        metaField.getValue());
                }
            }
            acc.add(childBuilder.apply(childFields));
        }
        return acc;
    }

    public static Boolean toBool(String acfValue) {
        return "1".equals(acfValue);
    }

    public String getPostLinkById(String id) {
        if (isNullOrEmpty(id)) {
            return null;
        }
        // This is 1+N database round-trips, but it is no worse than WP
        // We should consider caching if necessary
        String slug = dslContext
            .select(WP_POSTS.POST_NAME)
            .from(WP_POSTS)
            .where(WP_POSTS.ID.eq(Integer.parseInt(id)))
            .and(WP_POSTS.POST_STATUS.eq(inline("publish")))
            .fetchOne(WP_POSTS.POST_NAME);

        return "/" + slug + "/";
    }

    /**
     * See https://stackoverflow.com/questions/14297926/structure-of-a-serialized-php-string
     *
     * If we need more complex PHP deserialization, consider
     * https://github.com/ironpinguin/serialized-php-parser
     */
    public static List<Integer> deserializePhpStringArrayOfInts(String listEncoded) {
        if (isNullOrEmpty(listEncoded)) {
            return emptyList();
        }
        Matcher arrayOuterMatcher = PHP_SERIALIZED_ARRAY_PAT.matcher(listEncoded);
        if (!arrayOuterMatcher.matches()) {
            throw new IllegalArgumentException(
                "Unrecgonised format: \"" + listEncoded + "\"");
        }
        String arrayContentsStr = arrayOuterMatcher.group("contents");
        Matcher keyValMatcher = PHP_SERIALIZED_ARRAY_ENTRY_PAT.matcher(arrayContentsStr);
        List<Integer> acc = new ArrayList<>();
        int lastMatchEnd = 0;
        while (keyValMatcher.find()) {
            acc.add(Integer.parseInt(keyValMatcher.group("valstrdata")));
            lastMatchEnd = keyValMatcher.end();
        }

        if (lastMatchEnd != arrayContentsStr.length()) {
            throw new IllegalArgumentException(
                "Unrecgonised format: \"" + listEncoded + "\"");
        }

        return acc;
    }
}
