package uk.gov.beis.dceas.config;

import com.google.common.base.Strings;
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

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
        
        if (!Strings.isNullOrEmpty(password)) {
            http.authorizeRequests()
                    .anyRequest().authenticated()
                    .and()
                    .httpBasic()
                    .realmName("BEIS SEA");
        }
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        if (!Strings.isNullOrEmpty(password)) {
            auth.inMemoryAuthentication()
                    .withUser(username)
                    .password(password)
                    .authorities("ROLE_USER");
        }
    }
}
