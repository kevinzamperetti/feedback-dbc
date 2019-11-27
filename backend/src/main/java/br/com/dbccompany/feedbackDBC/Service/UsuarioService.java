package br.com.dbccompany.feedbackDBC.Service;

import br.com.dbccompany.feedbackDBC.Entity.Usuario;
import br.com.dbccompany.feedbackDBC.Enum.TipoUsuario;
import br.com.dbccompany.feedbackDBC.Repository.UsuarioRepository;
import br.com.dbccompany.feedbackDBC.Util.Criptografia;
import br.com.dbccompany.feedbackDBC.Util.Validadores;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service("userDetailsService")
@Service
public class UsuarioService extends AbstractService<Usuario, UsuarioRepository>{

    @Override
    public Usuario salvar( Usuario usuario ) throws Exception {

        if( !Validadores.validarEmail( usuario.getEmail() ) ) {
            throw new Exception( "ERRO-Email inválido!" );
        }

        if ( repository.findByEmail( usuario.getEmail() ) != null ) {
            throw new Exception( "ERRO-Email já cadastrado para outro usuário!" );
        }

        usuario.setSenha( Criptografia.criptografarSenha( usuario.getSenha() ) );

        return super.salvar( usuario );
    }

    public List<Usuario> todosGestores(){
        return repository.findAllByTipoUsuario(TipoUsuario.GESTOR);
    }

    public List<Usuario> todosFuncionarios(){
        return repository.findAllByTipoUsuario(TipoUsuario.FUNCIONARIO);
    }
}
