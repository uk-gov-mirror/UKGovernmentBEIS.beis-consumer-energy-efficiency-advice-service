package uk.gov.beis.dceas.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.web.util.matcher.IpAddressMatcher;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Takes a list of masks from config and checks whether the user is coming from one of
 * these whitelisted IP addresses. THis will work for both IPv4 and IPv6
 */
@Service
public class IpValidationService {
    private final List<String> ipWhitelist;

    public IpValidationService(@Value("${dceas.admin-ip-whitelist}") String ipWhitelist) {
        this.ipWhitelist = Arrays.asList(ipWhitelist.split(","));
    }

    public boolean requestIsInIpWhitelist(HttpServletRequest request) {
        List<String> ipAddresses = new ArrayList<String>();
        ipAddresses.add(request.getRemoteAddr());

        String proxiedIpsOrNull = request.getHeader("X-FORWARDED-FOR");
        if (proxiedIpsOrNull != null) {
            ipAddresses.addAll(Arrays.asList(proxiedIpsOrNull.split(", ")));
        }

        for (String ipAddress : ipAddresses) {
            for (String subnet : ipWhitelist) {
                if (matches(ipAddress, subnet)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean matches(String ip, String subnet) {
        IpAddressMatcher ipAddressMatcher = new IpAddressMatcher(subnet);
        return ipAddressMatcher.matches(ip);
    }
}
