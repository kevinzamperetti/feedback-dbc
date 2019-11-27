package br.com.dbccompany.feedbackDBC.Entity;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@Table(name = "PROJETOS_X_USUARIOS")
@JsonIdentityInfo( generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = ProjetoXUsuario.class )
public class ProjetoXUsuario extends AbstractEntity{
    @Id
    @Column(name = "ID_PROJETOS_X_USUARIOS")
    @SequenceGenerator( allocationSize = 1, name = "PROJETOS_X_USUARIOS_SEQ", sequenceName = "PROJETOS_X_USUARIOS_SEQ")
    @GeneratedValue(generator = "PROJETOS_X_USUARIOS_SEQ", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @ManyToOne
    @JoinColumn( name = "FK_ID_PROJETO" )
    private Projeto projeto;

    @ManyToOne
    @JoinColumn( name = "FK_ID_USUARIO_FUNCIONARIO" )
    private Usuario usuarioFuncionario;

    public Projeto getProjeto() {
        return projeto;
    }

    public void setProjeto(Projeto projeto) {
        this.projeto = projeto;
    }

    public Usuario getUsuarioFuncionario() {
        return usuarioFuncionario;
    }

    public void setUsuarioFuncionario(Usuario usuarioFuncionario) {
        this.usuarioFuncionario = usuarioFuncionario;
    }

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }
}
