package br.com.dbccompany.feedbackDBC.Entity;

import br.com.dbccompany.feedbackDBC.Enum.StatusProjeto;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "PROJETOS")
//@JsonIdentityInfo( generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Projeto.class )
public class Projeto extends AbstractEntity{
    @Id
    @Column(name = "ID_PROJETO")
    @SequenceGenerator( allocationSize = 1, name = "PROJETO_SEQ", sequenceName = "PROJETO_SEQ")
    @GeneratedValue(generator = "PROJETO_SEQ", strategy = GenerationType.SEQUENCE)
    private Integer id;
    @Column(name = "NOME", nullable = false)
    private String nome;
    @Column(name = "NOME_CLIENTE", nullable = false)
    private String nomeCliente;

    @Enumerated(EnumType.STRING)
    private StatusProjeto statusProjeto;

    @OneToMany( mappedBy = "projeto", cascade = CascadeType.ALL )
    private List<ProjetoXUsuario> projetoXUsuarioList = new ArrayList<>();

    @ManyToOne
    //@JsonIgnore
    @JoinColumn( name = "FK_ID_USUARIO_GESTOR" )
    private Usuario usuarioGestor;

    @OneToMany( mappedBy = "projeto", cascade = CascadeType.ALL )
    private List<Feedback> feedbackList = new ArrayList<>();

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public List<Feedback> getFeedbackList() {
        return feedbackList;
    }

    public void setFeedbackList(List<Feedback> feedbackList) {
        this.feedbackList = feedbackList;
    }

    public Usuario getUsuarioGestor() {
        return usuarioGestor;
    }

    public void setUsuarioGestor(Usuario usuarioGestor) {
        this.usuarioGestor = usuarioGestor;
    }

    public List<ProjetoXUsuario> getProjetoXUsuarioList() {
        return projetoXUsuarioList;
    }

    public void setProjetoXUsuarioList(List<ProjetoXUsuario> projetoXUsuarioList) {
        this.projetoXUsuarioList = projetoXUsuarioList;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public StatusProjeto getStatusProjeto() {
        return statusProjeto;
    }

    public void setStatusProjeto(StatusProjeto statusProjeto) {
        this.statusProjeto = statusProjeto;
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
