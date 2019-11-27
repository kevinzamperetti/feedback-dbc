

public abstract class AbstractController < Entidade extends AbstractEntity,
                                           EntidadeService extends AbstractService< Entidade, EntidadeRepository >,
                                           EntidadeRepository extends CrudRepository< Entidade, Integer >
                                           > {
											   
											   
	/* Basicamente aqui nessa AbstractController, se é passado por parâmetro a entidade (Entidade extendendo AbstractEntity) 
	   service (EntidadeService extendendo AbstractService< Entidade, EntidadeRepository > Passando por parâmetro a Entidade e a Repository,
	   e repository (EntidadeRepository extendendo CrudRepository< Entidade, Integer > passando por parâmetro a Entidade e a tipagem */
	   
	   //Agora sempre que uma controller for criada, só o que será feito é passar os 3 parâmetros de acordo com a entidade.
											   
    @Autowired
    EntidadeService service;

    @GetMapping( value = "/")
    @ResponseBody
    public List<Entidade> listAll() throws Exception {
        return service.all();
    }

    @PostMapping( value = "/new" )
    @ResponseBody
    public Entidade newEntity( @RequestBody Entidade entidade ) throws Exception {
        return service.save( entidade );
    }

    @PutMapping( value = "/edit/{id}")
    @ResponseBody
    public Entidade edit( @PathVariable Integer id, @RequestBody Entidade entidade ) throws Exception {
        return service.edit( id, entidade );
    }

    @DeleteMapping( value = "delete/{id}" )
    @ResponseBody
    public void delete( @PathVariable Integer id ) throws Exception {
        service.remove( id );
    }
}
