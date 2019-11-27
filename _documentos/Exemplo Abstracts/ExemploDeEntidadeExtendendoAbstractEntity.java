
@Entity
@SequenceGenerator( allocationSize = 1, name "NOME_DA_ENTIDADE", sequenceName = "NOME_DA_ENTIDADE" )
public class nomeDaEntidade	extends AbstractEntity {
	
	@Id
	@GeneratedValue( generator = "NOME_DA_ENTIDADE", strategy = GenerationType.SEQUENCE )
	private Integer id;
	
	//Resto da estrutura padrão da entidade.
}