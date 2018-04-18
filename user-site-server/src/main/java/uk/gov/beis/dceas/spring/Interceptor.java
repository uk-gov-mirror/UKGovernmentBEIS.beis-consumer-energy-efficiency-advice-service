package uk.gov.beis.dceas.spring;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.TimeUnit;

public class Interceptor extends HandlerInterceptorAdapter {
    long reqStartTime;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws InterruptedException{
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
            TimeUnit.MILLISECONDS.sleep(responseDelay);
        }
    }
}
