package uk.gov.beis.dceas.infrastructure;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.HttpHostConnectException;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.codehaus.groovy.ast.expr.ArgumentListExpression;
import org.hamcrest.Matchers;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.either;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.instanceOf;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

/**
 * This test should be run manually, so it is marked "Ignore".
 * We don't want the build to fail if there is a problem on the live site,
 * as that might stop us from fixing it!
 */
@Ignore
@RunWith(Parameterized.class)
public class LiveDomainNameTest {

    private final String url;

    public static final String CANONICAL_ADDRESS = "https://www.simpleenergyadvice.org.uk/";
    public static final String CANONICAL_ADDRESS_NO_PATH = "https://www.simpleenergyadvice.org.uk";
    public static final String CANONICAL_ADDRESS_EXPLICIT_PORT = "https://www.simpleenergyadvice.org.uk:443/";
    private final String expected;

    @Parameterized.Parameters(name = "{0} => {1}")
    public static List<Object[]> data() {
        return Arrays.asList(new Object[][]{
                {"https://www.simpleenergyadvice.org.uk/", "LIVE"},
                {"http://www.simpleenergyadvice.org.uk/", "301"},
                {"https://simpleenergyadvice.org.uk/", "hang"},
                {"http://simpleenergyadvice.org.uk/", "301"},
                {"https://www.eachhomecountsadvice.org.uk/", "301"},
                {"http://www.eachhomecountsadvice.org.uk/", "301"},
                {"https://eachhomecountsadvice.org.uk/", "hang"},
                {"http://eachhomecountsadvice.org.uk/", "301"}
        });
    }

    public LiveDomainNameTest(String url, String expected) {
        this.url = url;
        this.expected = expected;
    }

    @Test
    public void testLiveSite() throws Exception {
        switch (expected) {
            case "LIVE":
                assertIsLiveSiteHomepage(get(url));
                break;
            case "hang":
                try {
                    get(url);
                    fail("expected exception");
                } catch (Exception e) {
                    assertThat(e, instanceOf(HttpHostConnectException.class));
                    assertThat(e.getMessage(), containsString("Connection timed out"));
                }
                break;
            case "301":
                assertIsRedirect(get(url));
                break;
            default:
                throw new IllegalArgumentException(expected);
        }
    }

    private void assertIsRedirect(HttpResponse response) {
        assertThat(response.getStatusLine().getStatusCode(), equalTo(301));
        assertThat(response.getFirstHeader("Location").getValue(),
                either(equalTo(CANONICAL_ADDRESS))
                        .or(equalTo(CANONICAL_ADDRESS_NO_PATH))
                        .or(equalTo(CANONICAL_ADDRESS_EXPLICIT_PORT)));
    }

    private void assertIsLiveSiteHomepage(HttpResponse response) throws Exception {
        assertThat(response.getStatusLine().getStatusCode(), equalTo(200));
        assertThat(EntityUtils.toString(response.getEntity()),
                containsString("buildUrl: 'https://travis-ci.org/UKGovernmentBEIS/beis-consumer-energy-efficiency-advice-service"));
    }

    private HttpResponse get(String url) throws Exception {
        HttpClient client = HttpClientBuilder.create()
                .disableRedirectHandling()
                .build();
        HttpGet request = new HttpGet(url);
        return client.execute(request);
    }
}
