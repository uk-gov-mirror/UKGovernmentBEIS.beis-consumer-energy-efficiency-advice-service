package uk.gov.beis.dceas.service;

import org.jooq.DSLContext;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import uk.gov.beis.dceas.api.PostcodesResponse;
import uk.gov.beis.dceas.db.gen.tables.records.WpPostmetaRecord;
import uk.gov.beis.dceas.db.gen.tables.records.WpPostsRecord;

import javax.mail.Address;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.argThat;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static uk.gov.beis.dceas.db.gen.Tables.WP_POSTMETA;
import static uk.gov.beis.dceas.db.gen.Tables.WP_POSTS;

@RunWith(SpringRunner.class)
@SpringBootTest("integrationTest=true")
public class LocalAuthoritiesCheckServiceTest {

    @Autowired
    private DSLContext database;

    private static final String postcodesUrl = "https://api.example.com/postcodes";
    private static final Integer postcodesRequestLimit = 10;
    private static final String supportEmail = "localauthoritysupport@example.com";

    private RestTemplate httpClient;
    private JavaMailSender emailSender;
    private MimeMessage message;
    private LocalAuthoritiesCheckService service;

    private Integer id = 0;

    @Before
    public void setUp() {
        purgeDatabase();

        httpClient = mock(RestTemplate.class);
        RestTemplateBuilder httpClientBuilder = mock(RestTemplateBuilder.class);
        when(httpClientBuilder.build()).thenReturn(httpClient);

        emailSender = mock(JavaMailSender.class);
        message = new MimeMessage((Session)null);
        when(emailSender.createMimeMessage()).thenReturn(message);

        service = new LocalAuthoritiesCheckService(
            httpClientBuilder,
            postcodesUrl,
            postcodesRequestLimit,
            database,
            emailSender,
            supportEmail,
            "test");
    }

    @After
    public void tearDown() {
        purgeDatabase();
    }

    private void purgeDatabase() {
        database.deleteFrom(WP_POSTMETA).execute();
        database.deleteFrom(WP_POSTS).execute();
    }

    @Test
    public void noApiCallMadeOrEmailSentIfNoPostcodesInDatabase() throws Exception {
        // Arrange
        insertLocalAuthorityWithoutPostcode("Antrim and Newtownabbey", "N09000001");
        insertLocalAuthorityWithoutPostcode("Bradford", "E08000032");

        // Act
        service.checkLocalAuthorities();

        // Assert
        verify(httpClient, never()).postForObject(eq(postcodesUrl), any(), eq(PostcodesResponse.class));
        verify(emailSender, never()).send(any(MimeMessage.class));
    }

    @Test
    public void sendFailureEmailIfNoResponseFromPostcodesApi() throws Exception {
        // Arrange
        insertLocalAuthority("Camden", "E09000007", "NW5 1TL");
        when(httpClient.postForObject(any(), any(), any())).thenReturn(null);

        // Act
        service.checkLocalAuthorities();

        // Assert
        verifyMessageIsSentToSupport();
        assertThatMessageContains("No response");
    }

    @Test
    public void sendFailureEmailIfNon200StatusCodeResponseFromPostcodesApi() throws Exception {
        // Arrange
        insertLocalAuthority("Doncaster", "E08000017", "EN1 1AF");
        when(httpClient.postForObject(eq(postcodesUrl), any(), eq(PostcodesResponse.class)))
            .thenThrow(new HttpClientErrorException(HttpStatus.BAD_REQUEST));

        // Act
        service.checkLocalAuthorities();

        // Assert
        verifyMessageIsSentToSupport();
        assertThatMessageContains("400 response");
    }

    @Test
    public void sendFailureEmailIfPostcodeIsNotFound() throws Exception {
        // Arrange
        insertLocalAuthority("Exeter", "E07000041", "EX1 1ZZ");
        setPostcodesApiResponse(
            result("EX1 1ZZ", null, null));

        // Act
        service.checkLocalAuthorities();

        // Assert
        verifyMessageIsSentToSupport();
        assertThatMessageContains("EXPECTED: Exeter (E07000041)", "ACTUAL: null");
    }

    @Test
    public void sendFailureEmailIfCodeDoesNotMatch() throws Exception {
        // Arrange
        insertLocalAuthority("Fife", "S12000015", "KY2 6BF");
        setPostcodesApiResponse(
            result("KY2 6BF", "Fife", "S12000047"));

        // Act
        service.checkLocalAuthorities();

        // Assert
        verifyMessageIsSentToSupport();
        assertThatMessageContains("EXPECTED: Fife (S12000015)", "ACTUAL: Fife (S12000047)");
    }

    @Test
    public void sendFailureEmailIfNameDoesNotMatch() throws Exception {
        // Arrange
        insertLocalAuthority("Gwinev", "W06000002", "LL45 2PJ");
        setPostcodesApiResponse(
            result("LL45 2PJ", "Gwynedd", "W06000002"));

        // Act
        service.checkLocalAuthorities();

        // Assert
        verifyMessageIsSentToSupport();
        assertThatMessageContains("EXPECTED: Gwinev (W06000002)", "ACTUAL: Gwynedd (W06000002)");
    }

    @Test
    public void noEmailsSentIfAllLocalAuthoritiesMatch() throws Exception {
        // Arrange
        insertLocalAuthority("Hammersmith and Fulham", "E09000013", "W6 8QS");
        insertLocalAuthority("Ipswich", "E07000202", "IP1 1QJ");
        insertLocalAuthority("Kensington and Chelsea", "E09000020", "W8 7AF");
        setPostcodesApiResponse(
            result("W6 8QS", "Hammersmith and Fulham", "E09000013"),
            result("IP1 1QJ", "Ipswich", "E07000202"),
            result("W8 7AF", "Kensington and Chelsea", "E09000020"));

        // Act
        service.checkLocalAuthorities();

        // Assert
        verify(emailSender, never()).send(any(MimeMessage.class));
    }

    @Test
    public void onlyMismatchesAreMentionedInFailureEmail() throws Exception {
        // Arrange
        insertLocalAuthority("Lisbon and Castlereagh", "N09000007", "BT28 3BQ");
        insertLocalAuthority("Manchester", "E08000003", "M4 4BF");
        insertLocalAuthority("Newry, Mourne and Down", "N09000010", "BT34 1CF");
        insertLocalAuthority("Oxford", "E07000178", "OX1 3DW");
        insertLocalAuthority("Perth and Kinross", "S12000024", "PH1 3TD");
        setPostcodesApiResponse(
            // Mismatch on name.
            result("BT28 3BQ", "Lisburn and Castlereagh", "N09000007"),
            // Match.
            result("M4 4BF", "Manchester", "E08000003"),
            // Not found.
            result("BT34 1CF", null, null),
            // Match.
            result("OX1 3DW", "Oxford", "E07000178"),
            // Mismatch on code.
            result("PH1 3TD", "Perth and Kinross", "S12000048"));

        // Act
        service.checkLocalAuthorities();

        // Assert
        verifyMessageIsSentToSupport();
        assertThatMessageContains(
            "EXPECTED: Lisbon and Castlereagh (N09000007)", "ACTUAL: Lisburn and Castlereagh (N09000007)",
            "EXPECTED: Newry, Mourne and Down (N09000010)", "ACTUAL: null",
            "EXPECTED: Perth and Kinross (S12000024)", "ACTUAL: Perth and Kinross (S12000048)");
        assertThatMessageDoesNotContain(
            "EXPECTED: Manchester (E08000003)",
            "EXPECTED: Oxford (E07000178)");
    }

    @Test
    public void duplicateExamplePostcodeUsedForMultipleLocalAuthoritiesIsHandledCorrectly() throws Exception {
        // Arrange
        insertLocalAuthority("Ribble Valley", "E07000124", "BB1 4AG");
        insertLocalAuthority("South Ribble", "E07000126", "BB1 4AG");
        setPostcodesApiResponse(
            result("BB1 4AG", "Ribble Valley", "E07000124"));

        // Act
        service.checkLocalAuthorities();

        // Assert
        // No exception thrown because of duplicate postcode.
        verifyMessageIsSentToSupport();
        assertThatMessageContains("EXPECTED: South Ribble (E07000126)", "ACTUAL: Ribble Valley (E07000124)");
        assertThatMessageDoesNotContain("EXPECTED: Ribble Valley (E07000124)");
    }

    @Test
    public void postcodesApiRequestLimitIsNotExceeded() throws Exception {
        // Arrange
        // Set up the database so that we should expect at least 4 API calls to keep below the request limit.
        Integer numberOfLocalAuthorities = (postcodesRequestLimit * 3) + (postcodesRequestLimit / 2);
        for (Integer i = 0; i < numberOfLocalAuthorities; i++) {
            String displayName = String.format("Local Authority %d", i);
            String localAuthorityCode = String.format("E%08d", i);
            String examplePostcode = String.format("A%d %dBC", i, i/10 + 1);
            insertLocalAuthority(displayName, localAuthorityCode, examplePostcode);
        }

        // Act
        service.checkLocalAuthorities();

        // Assert
        verify(httpClient, atLeast(4)).postForObject(eq(postcodesUrl), any(), any());
        verify(httpClient, never()).postForObject(eq(postcodesUrl), exceedsPostcodesRequestLimit(), any());
    }

    private void insertLocalAuthorityWithoutPostcode(String displayName, String localAuthorityCode) {
        insertLocalAuthority(displayName, localAuthorityCode, null);
    }

    private void insertLocalAuthority(String displayName, String localAuthorityCode, String examplePostcode) {
        WpPostsRecord post = new WpPostsRecord(
            nextID(),
            1,
            now(),
            now(),
            "",
            displayName,
            "publish",
            toSnakeCase(displayName),
            "local_authority"
        );
        database.executeInsert(post);
        database.executeInsert(new WpPostmetaRecord(nextID(), post.getId(), "display_name", displayName));
        database.executeInsert(new WpPostmetaRecord(nextID(), post.getId(), "local_authority_code", localAuthorityCode));
        if (examplePostcode != null) {
            database.executeInsert(new WpPostmetaRecord(nextID(), post.getId(), "example_postcode", examplePostcode));
        }
    }

    private Integer nextID() {
        return id++;
    }

    private Timestamp now() {
        return new Timestamp(Instant.now().toEpochMilli());
    }

    private String toSnakeCase(String name) {
        return name.toLowerCase().replace(' ', '_').replaceAll("\\W", "");
    }

    private void setPostcodesApiResponse(PostcodesResponse.QueryResult... results) {
        PostcodesResponse response = new PostcodesResponse(200, results);
        Set<String> postcodes = Arrays.stream(results).map(PostcodesResponse.QueryResult::getQuery).collect(Collectors.toSet());
        when(httpClient.postForObject(
            eq(postcodesUrl),
            matchesPostcodes(postcodes),
            eq(PostcodesResponse.class))).thenReturn(response);
    }

    private void verifyMessageIsSentToSupport() throws Exception {
        String[] senders = getEmails(message.getFrom());
        String[] recipients = getEmails(message.getAllRecipients());
        String subject = message.getSubject();
        assertThat(senders).containsOnly("no-reply@simpleenergyadvice.org.uk");
        assertThat(recipients).containsOnly(supportEmail);
        assertThat(subject).isEqualTo("[Simple Energy Advice - TEST] Local authority check failed");
        verify(emailSender).send(message);
    }

    private void assertThatMessageContains (String... values) throws Exception {
        assertThat(message.getContent().toString()).contains(values);
    }

    private void assertThatMessageDoesNotContain(String... values) throws Exception {
        for (String value : values) {
            assertThat(message.getContent().toString()).doesNotContain(value);
        }
    }

    private String[] getEmails(Address[] addresses) {
        return Arrays.stream(addresses).map(Address::toString).toArray(String[]::new);
    }

    private PostcodesResponse.QueryResult result(String postcode, String name, String code) {
        return new PostcodesResponse.QueryResult(
            postcode,
            (name == null || code == null) ? null : new PostcodesResponse.QueryResult.Postcode(
                postcode,
                1,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                name,
                null,
                null,
                null,
                null,
                null,
                null,
                new PostcodesResponse.QueryResult.Postcode.Codes(
                    code,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null)));
    }

    private Object matchesPostcodes(Set<String> expectedPostcodes) {
        return argThat(new MatchesPostcodes(expectedPostcodes));
    }

    private Object exceedsPostcodesRequestLimit() {
        return argThat(new ExceedsPostcodesRequestLimit(postcodesRequestLimit));
    }

    private static class MatchesPostcodes extends ArgumentMatcher<Object> {
        private Set expectedPostcodes;

        private MatchesPostcodes(Set expectedPostcodes) {
            this.expectedPostcodes = expectedPostcodes;
        }

        @Override
        public boolean matches(Object argument) {
            if (!(argument instanceof HashMap)) {
                return false;
            }
            Object postcodesObject = ((HashMap)argument).get("postcodes");
            if (!(postcodesObject instanceof Set)) {
                return false;
            }
            @SuppressWarnings("unchecked")
            Set<String> postcodesSet = (Set)postcodesObject;
            return (postcodesSet.size() == expectedPostcodes.size()) && postcodesSet.containsAll(expectedPostcodes);
        }
    }

    private static class ExceedsPostcodesRequestLimit extends ArgumentMatcher<Object> {
        private final Integer postcodesRequestLimit;

        private ExceedsPostcodesRequestLimit(Integer postcodesRequestLimit) {
            this.postcodesRequestLimit = postcodesRequestLimit;
        }

        @Override
        public boolean matches(Object argument) {
            if (!(argument instanceof HashMap)) {
                return false;
            }
            Object postcodesObject = ((HashMap)argument).get("postcodes");
            if (!(postcodesObject instanceof Set)) {
                return false;
            }
            Set postcodesSet = (Set)postcodesObject;
            return postcodesSet.size() > postcodesRequestLimit;
        }
    }
}
