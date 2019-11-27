package br.com.dbccompany.feedbackDBC.Repository;

import br.com.dbccompany.feedbackDBC.Entity.ProjetoXUsuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjetoXUsuarioRepository extends CrudRepository<ProjetoXUsuario, Integer> {
}
