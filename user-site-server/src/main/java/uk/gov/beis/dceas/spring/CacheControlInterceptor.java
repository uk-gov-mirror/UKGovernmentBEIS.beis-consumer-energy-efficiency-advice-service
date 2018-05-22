package uk.gov.beis.dceas.spring;

import org.springframework.http.CacheControl;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.TimeUnit;

/**
 * Adds cache control headers to all our responses which do not already have them
 * (WP adds its own headers).
 *
 * This is turned off in dev.
 */
public class CacheControlInterceptor extends HandlerInterceptorAdapter {

    private static final String cacheHeaderValue = CacheControl
            .maxAge(1, TimeUnit.HOURS)
            .staleWhileRevalidate(5, TimeUnit.MINUTES)
            .cachePublic()
            .getHeaderValue();

    @Override
    public void postHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler,
        ModelAndView modelAndView) throws Exception {

        if ("GET".equals(request.getMethod())) {
            if (!response.containsHeader("Cache-Control")) {
                // We allow CloudFront to cache all our GET responses for 1 hour
                // This includes the HTML for the SPA landing pages, and any GET AJAX
                // requests like the list of Measures.
                // Static resources (like the JS bundles) have their cache headers set
                // in the ResourceHandlerConfig class
                response.setHeader("Cache-Control", cacheHeaderValue);
            }
        }
    }
}
