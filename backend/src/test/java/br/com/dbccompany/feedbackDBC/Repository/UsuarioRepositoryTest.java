package br.com.dbccompany.feedbackDBC.Repository;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.dbccompany.feedbackDBC.Entity.Usuario;
import br.com.dbccompany.feedbackDBC.Enum.TipoUsuario;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith( SpringRunner.class )
@DataJpaTest
public class UsuarioRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Test
    public void procurarUsuarioPorNome() {
        Usuario usuario = new Usuario();
        usuario.setNome( "Kevin Zamperetti Schepke" );
        usuario.setEmail( "kevin.zamperetti@dbccompany.com.br" );
        usuario.setSenha( "123456" );
        usuario.setTipoUsuario( TipoUsuario.GESTOR );

        entityManager.persist( usuario );
        entityManager.flush();  //atualiza os dados

        Usuario resp = usuarioRepository.findByNome( usuario.getNome() );
        assertThat( resp.getNome() ).isEqualTo( usuario.getNome() );
    }

}
