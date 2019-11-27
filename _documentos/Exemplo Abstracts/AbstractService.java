
public abstract class AbstractService < Entidade extends AbstractEntity, Repository extends CrudRepository< Entidade, Integer >> {

	/*Basicamente "Entidade" está estendendo AbstractEntity logo, 
	aquele parâmetro "Entidade" só pode receber uma classe que extende de AbstractEntity, logo uma entidade.*/
	
	/*"Repository" extende de CrudRepository passando por parâmetro a "Entidade" que a gente criou e a tipagem Integer (pro id) */
	
	//Com isso, sempre que uma service for criada deve-se passar por parâmetro da classe o nome da Entidade e o nome da Repository da mesma. 
	//E apenas isso vai ser necessário, o que vai acontecer nas services vão ser Overrides pra sobrescrever essa classes Abstract aqui. 


    @Autowired
    Repository repository;

    @Transactional( rollbackFor = Exception.class )
    public Entidade save( Entidade entidade ) throws Exception {
        return repository.save( entidade );
    }

    @Transactional( rollbackFor = Exception.class )
    public Entidade edit( Integer id, Entidade entidade ) throws Exception {
        entidade.setId( id );
        return repository.save( entidade );
    }

    @Transactional( rollbackFor =  Exception.class )
    public List<Entidade> all() {
        return (List<Entidade>) repository.findAll();
    }

    @Transactional( rollbackFor = Exception.class )
    public void remove( Integer id ) throws  Exception {
        repository.deleteById( id );
    }
}
