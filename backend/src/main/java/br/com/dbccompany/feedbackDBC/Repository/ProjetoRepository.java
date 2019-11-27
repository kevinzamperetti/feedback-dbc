package br.com.dbccompany.feedbackDBC.Repository;

import br.com.dbccompany.feedbackDBC.Entity.Projeto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjetoRepository extends CrudRepository<Projeto, Integer> {
}
