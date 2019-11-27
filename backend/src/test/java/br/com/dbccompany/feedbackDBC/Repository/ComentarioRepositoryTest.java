package br.com.dbccompany.feedbackDBC.Repository;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.dbccompany.feedbackDBC.Entity.Comentario;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith( SpringRunner.class )
@DataJpaTest
public class ComentarioRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Test
    public void procurarComentario() {
        Comentario comentario = new Comentario();
        comentario.setComentario( "Realizando um teste de comentario" );

        entityManager.persist( comentario );
        entityManager.flush();  //atualiza os dados

        Comentario resp = comentarioRepository.findByComentario( comentario.getComentario() );
        assertThat( resp.getComentario() ).isEqualTo( comentario.getComentario() );
    }
}
