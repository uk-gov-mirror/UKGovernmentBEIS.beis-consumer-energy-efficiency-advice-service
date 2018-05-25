package uk.gov.beis.dceas.service;

import com.google.common.base.Splitter;
import com.google.common.collect.Iterables;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.CacheControl;
import org.springframework.security.web.util.matcher.IpAddressMatcher;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

import static com.google.common.base.Strings.isNullOrEmpty;

/**
 * Takes a list of masks from config and checks whether the user is coming from one of
 * these whitelisted IP addresses. THis will work for both IPv4 and IPv6
 */
@Service
public class IpValidationService {
    private final List<String> ipWhitelist;
    private final Logger log = LoggerFactory.getLogger(getClass());

    public IpValidationService(@Value("${vcap.services.dceas-user-site.config.credentials.admin-ip-whitelist}") String ipWhitelist) {
        this.ipWhitelist = Arrays.asList(ipWhitelist.split(","));
    }

    /**
     * Return true if the given request is from a user with an IP which might suggest
     * that they are an admin user.
     *
     * The response is marked as not cacheable, since it now varies by client IP
     */
    public boolean requestIsInIpWhitelist(HttpServletRequest request, HttpServletResponse response) {

        response.setHeader("Cache-Control", CacheControl.noCache().getHeaderValue());

        log.debug(
                "requestIsInIpWhitelist: getRemoteAddr='{}' X-FORWARDED-FOR='{}'",
                request.getRemoteAddr(),
                request.getHeader("X-Forwarded-For"));

        // On the live site, the app is behind AWS CloudFront CDN, which does caching for us
        // and also hosts our public hostname and TLS cert ("www.eachhomecountsadvice.org.uk"
        // rather than "dceas-user-site.cloudapps.digital").
        //
        // The CloudFront layer adds an address to the end of the X-FORWARDED-FOR header.
        // Any spoof entries added by untrusted clients will appear in X-FORWARDED-FOR, but we
        // can trust the last entry in that list as it was added by AWS.
        //
        // The value returned by request.getRemoteAddr() will be the IP of the AWS VM running
        // the CloudFront node we are connected to, so is not useful here
        String ipAddress;
        String forwardedHeader = request.getHeader("X-Forwarded-For");
        if (isNullOrEmpty(forwardedHeader)) {
            log.warn("No `X-Forwarded-For` found, falling back to `getRemoteAddr`, which will be incorrect in LIVE");
            ipAddress = request.getRemoteAddr();
        } else {
            List<String> ips = Splitter.on(',').trimResults().omitEmptyStrings()
                    .splitToList(forwardedHeader);
            ipAddress = Iterables.getLast(ips);
        }

        for (String subnet : ipWhitelist) {
            if (matches(ipAddress, subnet)) {
                log.debug("return true");
                return true;
            }
        }
        log.debug("return false");
        return false;
    }

    private boolean matches(String ip, String subnet) {
        IpAddressMatcher ipAddressMatcher = new IpAddressMatcher(subnet);
        return ipAddressMatcher.matches(ip);
    }
}
