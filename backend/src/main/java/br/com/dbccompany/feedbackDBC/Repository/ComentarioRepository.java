package br.com.dbccompany.feedbackDBC.Repository;

import br.com.dbccompany.feedbackDBC.Entity.Comentario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioRepository extends CrudRepository <Comentario, Integer> {
    Comentario findByComentario(String comentario);
}
