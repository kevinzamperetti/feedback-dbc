package br.com.dbccompany.feedbackDBC.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Date;

public class TokenAuthenticationService {

    static  final long EXPIRATION_TIME = 860_000_000;
    static  final String SECRET = "feedbackDBC";
    static  final String TOKEN_PREFIX = "Bearer";
    static  final String HEADER_STRING = "Authorization";

    static void addAuthentication( HttpServletResponse response, String username ) {
        String JWT = Jwts.builder()
                     .setSubject( username )
                     .setExpiration( new Date( System.currentTimeMillis() + EXPIRATION_TIME ) )
                     .signWith( SignatureAlgorithm.HS512, SECRET )
                     .compact();
        response.addHeader( HEADER_STRING, TOKEN_PREFIX + " " + JWT );
    }

    static Authentication getAuthentication(HttpServletRequest request ) {
        String token = request.getHeader( HEADER_STRING );

        if ( token != null ) {
            String user = Jwts.parser()
                          .setSigningKey( SECRET )
                          .parseClaimsJws( token.replace( TOKEN_PREFIX, "" ) )
                          .getBody()
                          .getSubject();
            if ( user != null )
                return new UsernamePasswordAuthenticationToken( user, null, Collections.emptyList() );
        }
        return null;
    }
}
