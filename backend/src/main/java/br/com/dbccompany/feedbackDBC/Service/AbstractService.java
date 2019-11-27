package br.com.dbccompany.feedbackDBC.Service;


import br.com.dbccompany.feedbackDBC.Entity.AbstractEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public abstract class AbstractService < Entidade extends AbstractEntity, Repository extends CrudRepository<Entidade, Integer >> {

	/*Basicamente "Entidade" está estendendo AbstractEntity logo,
	aquele parâmetro "Entidade" só pode receber uma classe que extende de AbstractEntity, logo uma entidade.*/

    /*"Repository" extende de CrudRepository passando por parâmetro a "Entidade" que a gente criou e a tipagem Integer (pro id) */

    //Com isso, sempre que uma service for criada deve-se passar por parâmetro da classe o nome da Entidade e o nome da Repository da mesma.
    //E apenas isso vai ser necessário, o que vai acontecer nas services vão ser Overrides pra sobrescrever essa classes Abstract aqui.


    @Autowired
    Repository repository;

    @Transactional( rollbackFor = Exception.class )
    public Entidade salvar( Entidade entidade ) throws Exception {
        return repository.save( entidade );
    }

    @Transactional( rollbackFor = Exception.class )
    public Entidade editar( Integer id, Entidade entidade ) throws Exception {
        entidade.setId( id );
        return repository.save( entidade );
    }

    @Transactional( rollbackFor =  Exception.class )
    public List<Entidade> todos() {
        return (List<Entidade>) repository.findAll();
    }

    /*@Transactional( rollbackFor = Exception.class )
    public Entidade buscarPorID(Integer id ) throws Exception{
        Optional<Entidade> optional = repository.findById(id);
        return optional.isPresent()? optional.get(): null;
    }*/

    public Entidade buscarPorId(Integer id){
        return repository.findById(id).get();
    }

    @Transactional( rollbackFor = Exception.class )
    public void excluir( Integer id ) throws  Exception {
        repository.deleteById( id );
    }
}

