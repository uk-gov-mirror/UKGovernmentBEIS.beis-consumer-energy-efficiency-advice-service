package uk.gov.beis.dceas.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Value("${vcap.services.user-site-auth.credentials.username}")
    private String username;
    @Value("${vcap.services.user-site-auth.credentials.password}")
    private String password;
    @Value("${vcap.application.space_name}")
    private String environment;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        if (!environment.toUpperCase().equals("LIVE") && !environment.toUpperCase().equals("DEV")) {
            http.cors().and().csrf().disable()
                    .authorizeRequests()
                    .anyRequest().authenticated()
                    .and()
                    .httpBasic()
                    .realmName("BEIS SEA");
        }
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth.inMemoryAuthentication()
           .withUser(username)
           .password(password)
           .authorities("ROLE_USER");
    }
}
