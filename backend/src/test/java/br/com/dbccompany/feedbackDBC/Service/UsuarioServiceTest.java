package br.com.dbccompany.feedbackDBC.Service;

import br.com.dbccompany.feedbackDBC.Entity.Usuario;
import br.com.dbccompany.feedbackDBC.Enum.TipoUsuario;
import br.com.dbccompany.feedbackDBC.FeedbackDbcApplicationTests;
import br.com.dbccompany.feedbackDBC.Repository.UsuarioRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class UsuarioServiceTest extends FeedbackDbcApplicationTests{
    @Autowired
    UsuarioService usuarioService;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Test
    public void emailInvalido() {
            Usuario usuario = new Usuario();
            usuario.setNome( "Kevin" );
            usuario.setEmail( "kevin.zamperetti@gmail.com" );
            usuario.setSenha( "123456" );
            usuario.setTipoUsuario( TipoUsuario.GESTOR );

            try {
                usuarioService.salvar( usuario );
            }catch ( Exception e ){
                Assert.assertEquals( "ERRO-Email inválido!", e.getMessage() );
            }
    }

    @Test
    public void emailValido() {
        Usuario usuario2 = new Usuario();
        usuario2.setNome( "Kevin" );
        usuario2.setEmail( "kevin.zamperetti@dbccompany.com.br" );
        usuario2.setSenha( "123456" );
        usuario2.setTipoUsuario( TipoUsuario.GESTOR );

        try {
            usuarioService.salvar( usuario2 );
        }catch ( Exception e ){
            Assert.assertEquals( "ERRO-Email inválido!", e.getMessage() );
        }
    }

    @Test
    public void naoPermitirEmailDuplicado() {
        Usuario usuario3 = new Usuario();
        usuario3.setNome( "Kevin" );
        usuario3.setEmail( "gestor@dbccompany.com.br" );
        usuario3.setSenha( "123456" );
        usuario3.setTipoUsuario( TipoUsuario.GESTOR );

        Usuario usuario4 = new Usuario();
        usuario4.setNome( "William" );
        usuario4.setEmail( "gestor@dbccompany.com.br" );
        usuario4.setSenha( "123456" );
        usuario4.setTipoUsuario( TipoUsuario.GESTOR );

        try {
            usuarioService.salvar( usuario3 );
            usuarioService.salvar( usuario4 );
        }catch ( Exception e ){
            System.out.println("entrou no catch");
            Assert.assertEquals( "ERRO-Email já cadastrado para outro usuário!", e.getMessage() );
        }
    }
}
