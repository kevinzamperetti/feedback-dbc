package br.com.dbccompany.feedbackDBC.Entity;

import br.com.dbccompany.feedbackDBC.Enum.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "USUARIOS")
//@JsonIdentityInfo( generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Usuario.class )
public class Usuario extends AbstractEntity{
    @Id
    @Column(name = "ID_USUARIO")
    @SequenceGenerator( allocationSize = 1, name = "USUARIO_SEQ", sequenceName = "USUARIO_SEQ")
    @GeneratedValue(generator = "USUARIO_SEQ", strategy = GenerationType.SEQUENCE)
    private Integer id;
    @Column(name = "NOME", nullable = false)
    private String nome;
    @Column(name = "SENHA", nullable = false)
    private String senha;
    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;
    @Column(name = "IMAGEM")
    private String imagem;

    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;

    @OneToMany( mappedBy = "usuarioFuncionario", cascade = CascadeType.ALL )
    private List<ProjetoXUsuario> projetoXUsuarioList = new ArrayList<>();

    @OneToMany( mappedBy = "usuarioGestor", cascade = CascadeType.ALL)
    private List<Projeto> projetos = new ArrayList<>();

    @OneToMany( mappedBy = "funcionario", cascade = CascadeType.ALL )
    private List<Feedback> feedbackList = new ArrayList<>();

    public List<Feedback> getFeedbackList() {
        return feedbackList;
    }

    public void setFeedbackList(List<Feedback> feedbackList) {
        this.feedbackList = feedbackList;
    }

    public List<Projeto> getProjetos() {
        return projetos;
    }

    public void setProjetos(List<Projeto> projetos) {
        this.projetos = projetos;
    }

    public List<ProjetoXUsuario> getProjetoXUsuarioList() {
        return projetoXUsuarioList;
    }

    public void setProjetoXUsuarioList(List<ProjetoXUsuario> projetoXUsuarioList) {
        this.projetoXUsuarioList = projetoXUsuarioList;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
