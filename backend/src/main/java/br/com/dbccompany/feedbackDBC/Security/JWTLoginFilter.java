package br.com.dbccompany.feedbackDBC.Security;

import br.com.dbccompany.feedbackDBC.Entity.Usuario;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

    protected JWTLoginFilter( String url, AuthenticationManager authManager ) {
        super( new AntPathRequestMatcher( url ) );
        setAuthenticationManager( authManager );
    }

    @Override
    public Authentication attemptAuthentication( HttpServletRequest request, HttpServletResponse response ) throws AuthenticationException, IOException, ServletException {

        Usuario usuario = new ObjectMapper().readValue( request.getInputStream(), Usuario.class );
        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        usuario.getEmail(),
                        usuario.getSenha(),
                        Collections.emptyList()
                )
        );
    }

    @Override
    protected void successfulAuthentication (
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication auth ) throws IOException, ServletException {
            TokenAuthenticationService.addAuthentication( response, auth.getName() );
    }
}
