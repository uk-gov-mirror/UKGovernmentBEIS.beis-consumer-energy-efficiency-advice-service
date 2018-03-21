package uk.gov.beis.dceas.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class IpValidationService {
    private final List<String> ipWhitelist;

    public IpValidationService(@Value("${dceas.admin-ip-whitelist}") String ipWhitelist) {
        this.ipWhitelist = Arrays.asList(ipWhitelist.split(","));
    }

    public boolean requestIsInIpWhitelist(HttpServletRequest request) {
        List<String> ipAddresses = new ArrayList<String>();
        ipAddresses.add(request.getRemoteAddr());

        String proxyIpsOrNull = request.getHeader("X-FORWARDED-FOR");
        if (proxyIpsOrNull != null) {
            ipAddresses.addAll(Arrays.asList(proxyIpsOrNull.split(",")));
        }

        for (String ipAddress : ipAddresses) {
            if (ipWhitelist.contains(ipAddress)) {
                return true;
            }
        }
        return false;
    }
}
