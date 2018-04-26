package uk.gov.beis.dceas.spring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.TimeUnit;

public class DevSimulatedConnectionDelayInterceptor extends HandlerInterceptorAdapter {
    private long reqStartTime;
    private final Logger log = LoggerFactory.getLogger(getClass());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws InterruptedException {
        reqStartTime = System.currentTimeMillis();
        return true;
    }
    @Override
    public void postHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler,
        ModelAndView modelAndView) throws Exception {
        long responseDelay = 500 - (System.currentTimeMillis() - reqStartTime);
        if (responseDelay > 0) {
            log.debug("Sleeping for {}ms to simulate connection delays in real usage", responseDelay);
            TimeUnit.MILLISECONDS.sleep(responseDelay);
        }
    }
}
