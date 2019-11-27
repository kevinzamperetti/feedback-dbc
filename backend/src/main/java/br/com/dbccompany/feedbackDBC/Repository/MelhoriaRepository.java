package br.com.dbccompany.feedbackDBC.Repository;

import br.com.dbccompany.feedbackDBC.Entity.Melhoria;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MelhoriaRepository extends CrudRepository <Melhoria, Integer> {
    Melhoria findByNome(String nome);
}
