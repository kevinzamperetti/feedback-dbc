package br.com.dbccompany.feedbackDBC.Repository;

import br.com.dbccompany.feedbackDBC.Entity.Usuario;
import br.com.dbccompany.feedbackDBC.Enum.TipoUsuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario,  Integer> {

    Usuario findByNome( String nome );
    Usuario findByEmail( String email );
    List<Usuario> findAllByTipoUsuario(TipoUsuario tipo);
}
