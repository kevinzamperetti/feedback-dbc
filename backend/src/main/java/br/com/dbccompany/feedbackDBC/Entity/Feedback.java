package br.com.dbccompany.feedbackDBC.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table( name = "FEEDBACKS")
//@JsonIdentityInfo( generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Feedback.class )
public class Feedback extends AbstractEntity {

    @Id
    @Column(name = "ID_FEEDBACK")
    @SequenceGenerator(allocationSize = 1, name = "FEEDBACKS_SEQ", sequenceName = "FEEDBACKS_SEQ")
    @GeneratedValue(generator = "FEEDBACKS_SEQ", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column( name = "MENSAGEM", nullable = false)
    private String mensagem;

    @Column( name = "ULTIMA_ATUALIZACAO")
    private Date ultimaAtualizacao;

    @Column( name = "MELHORIAS")
    private ArrayList<String> melhorias = new ArrayList<>();

//    @OneToMany( mappedBy = "feedback", cascade = CascadeType.ALL )
//    private List<Melhoria> melhorias = new ArrayList<>();

//    @OneToMany( mappedBy = "feedback", cascade = CascadeType.ALL )
//    private List<Feedback> listaDeFeedback = new ArrayList<>();

    @OneToMany( mappedBy = "feedback", cascade = CascadeType.ALL )
    private List<Comentario> comentarios = new ArrayList<>();

    @ManyToOne
    //@JsonIgnore
    @JoinColumn( name = "KF_ID_USUARIO_FUNCIONARIO")
    private Usuario funcionario;

    @ManyToOne
    //@JsonIgnore
    @JoinColumn( name = "FK_ID_PROJETO" )
    private Projeto projeto;

    public Usuario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Usuario funcionario) {
        this.funcionario = funcionario;
    }

    public Projeto getProjeto() {
        return projeto;
    }

    public void setProjeto(Projeto projeto) {
        this.projeto = projeto;
    }

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Date getUltimaAtualizacao() throws ParseException {
        return ultimaAtualizacao;
//
//        SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
//        Date dateDate = null;
//        dateDate = df.parse( ultimaAtualizacao.toString() );
//        return dateDate;
    }

    public void setUltimaAtualizacao(Date ultimaAtualizacao) {
        this.ultimaAtualizacao = ultimaAtualizacao;
    }

    public ArrayList<String> getMelhorias() {
        return melhorias;
    }

    public void setMelhorias(ArrayList<String> melhorias) {
        this.melhorias = melhorias;
    }

    //    public List<Melhoria> getMelhorias() {
//        return melhorias;
//    }
//
//    public void setMelhorias(List<Melhoria> melhorias) {
//        this.melhorias = melhorias;
//    }

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }
}
