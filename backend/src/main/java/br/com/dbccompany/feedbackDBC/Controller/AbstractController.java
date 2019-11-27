package br.com.dbccompany.feedbackDBC.Controller;


import br.com.dbccompany.feedbackDBC.Entity.AbstractEntity;
import br.com.dbccompany.feedbackDBC.Service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class AbstractController <Entidade extends AbstractEntity,
        EntidadeRepository extends CrudRepository<Entidade, Integer >,
        EntidadeService extends AbstractService< Entidade, EntidadeRepository >
        > {


	/* Basicamente aqui nessa AbstractController, se é passado por parâmetro a entidade (Entidade extendendo AbstractEntity)
	   service (EntidadeService extendendo AbstractService< Entidade, EntidadeRepository > Passando por parâmetro a Entidade e a Repository,
	   e repository (EntidadeRepository extendendo CrudRepository< Entidade, Integer > passando por parâmetro a Entidade e a tipagem */

    //Agora sempre que uma controller for criada, só o que será feito é passar os 3 parâmetros de acordo com a entidade.

    @Autowired
    EntidadeService service;

    @GetMapping( value = "/")
    @ResponseBody
    public List<Entidade> todos() throws Exception {
        return service.todos();
    }

    @PostMapping( value = "/novo" )
    @ResponseBody
    public Entidade novo( @RequestBody Entidade entidade ) throws Exception {
        return service.salvar( entidade );
    }

    @PutMapping( value = "/editar/{id}")
    @ResponseBody
    public Entidade editar(@PathVariable Integer id, @RequestBody Entidade entidade ) throws Exception {
        return service.editar( id, entidade );
    }

    @DeleteMapping( value = "excluir/{id}" )
    @ResponseBody
    public void excluir( @PathVariable Integer id ) throws Exception {
        service.excluir( id );
    }
}