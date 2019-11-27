package br.com.dbccompany.feedbackDBC.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier( "userDetailsService" )
    private UserDetailsService userDetailsService;

    @Override
    protected void configure( HttpSecurity http ) throws Exception {
        //Configuração do HTTP
        http.headers().frameOptions().sameOrigin().and()
                .csrf().disable().authorizeRequests()
                .antMatchers( "/home" ).permitAll()
                .antMatchers( HttpMethod.POST, "/login" ).permitAll()
                .antMatchers( HttpMethod.POST,"/api/usuario/novo" ).permitAll()
                .antMatchers( HttpMethod.POST,"/api/upload/uploadFile/**" ).permitAll()
                .antMatchers( HttpMethod.GET, "/api/upload/img/**" ).permitAll()
                .antMatchers( HttpMethod.GET, "/img/**" ).permitAll()
                .antMatchers( HttpMethod.GET, "/api/upload/downloadFile/**" ).permitAll()
                .antMatchers( HttpMethod.GET, "/downloadFile/**" ).permitAll()
                .anyRequest().authenticated().and()
                .cors().and()

                //filtra requisição de login
                .addFilterBefore( new JWTLoginFilter( "/login", authenticationManager() ), UsernamePasswordAuthenticationFilter.class )

                //filtra outras requisições e verifica JWT no Header
                .addFilterBefore( new JWTAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class );
    }

    @Override
    protected void configure( AuthenticationManagerBuilder auth ) throws Exception {
        auth.userDetailsService( userDetailsService ).passwordEncoder( codificador() );
    }

    @Bean
    public PasswordEncoder codificador() {
        return new BCryptPasswordEncoder( 6 );
    }
}
