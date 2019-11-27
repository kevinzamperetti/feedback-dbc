package br.com.dbccompany.feedbackDBC.Security;

import static java.util.stream.Collectors.toSet;

import br.com.dbccompany.feedbackDBC.Entity.Usuario;
import br.com.dbccompany.feedbackDBC.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Stream;

@Service( "userDetailsService" )
public class UserDetailsImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    @Transactional( readOnly = true )
    public UserDetails loadUserByUsername(String email ) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail( email );

        if(  usuario == null ) {
            throw new UsernameNotFoundException( "ERRO-" + email + "não cadastrado! ");
        }

        Set<GrantedAuthority> permissoes = Stream
                .of( new SimpleGrantedAuthority( usuario.getEmail() ) )
                .collect( toSet() );

        return new User( usuario.getEmail(), usuario.getSenha(), permissoes );  //getLogin()
    }
}
