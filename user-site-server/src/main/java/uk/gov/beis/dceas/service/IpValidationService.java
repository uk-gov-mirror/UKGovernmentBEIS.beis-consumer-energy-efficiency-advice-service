package uk.gov.beis.dceas.service;

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

        log.info(
                "TODO:BEIS-208 debug: getRemoteAddr='{}' X-FORWARDED-FOR='{}'",
                request.getRemoteAddr(),
                request.getHeader("X-Forwarded-For"));

        // TODO BEISDEAS-208 The original client's address is being returned from "getRemoteAddr"
        // There is a chance that further down the line, a load balancer or proxy will
        // be added. At this point, we should check the X-FORWARDED-FOR header and use
        // that to find out the user's IP address
        String ipAddress = request.getRemoteAddr();
        for (String subnet : ipWhitelist) {
            if (matches(ipAddress, subnet)) {
                return true;
            }
        }
        return false;
    }

    private boolean matches(String ip, String subnet) {
        IpAddressMatcher ipAddressMatcher = new IpAddressMatcher(subnet);
        return ipAddressMatcher.matches(ip);
    }
}
