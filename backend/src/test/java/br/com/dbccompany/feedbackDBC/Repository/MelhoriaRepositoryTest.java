package br.com.dbccompany.feedbackDBC.Repository;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.dbccompany.feedbackDBC.Entity.Melhoria;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith( SpringRunner.class )
@DataJpaTest
public class MelhoriaRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private MelhoriaRepository melhoriaRepository;

    @Test
    public void procurarMelhoriaPorNome() {
        Melhoria melhoria = new Melhoria();
        melhoria.setNome( "Atenção" );

        entityManager.persist( melhoria );
        entityManager.flush();  //atualiza os dados

        Melhoria resp = melhoriaRepository.findByNome( melhoria.getNome() );
        assertThat( resp.getNome() ).isEqualTo( melhoria.getNome() );
    }
}
