package br.com.dbccompany.feedbackDBC.Entity;

import br.com.dbccompany.feedbackDBC.Enum.StatusMelhoria;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@Table(name = "MELHORIAS")
@JsonIdentityInfo( generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Melhoria.class )
public class Melhoria extends AbstractEntity{
    @Id
    @Column(name = "ID_MELHORIA")
    @SequenceGenerator(allocationSize = 1, name = "MELHORIA_SEQ", sequenceName = "MELHORIA_SEQ")
    @GeneratedValue(generator = "MELHORIA_SEQ", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "NOME", length = 100, nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    private StatusMelhoria statusMelhoria;

//    @ManyToOne
//    @JoinColumn(name = "FK_ID_FEEDBACK")
//    private Feedback feedback;

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

//    public Feedback getFeedback() {
//        return feedback;
//    }
//
//    public void setFeedback(Feedback feedback) {
//        this.feedback = feedback;
//    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public StatusMelhoria getStatusMelhoria() {
        return statusMelhoria;
    }

    public void setStatusMelhoria(StatusMelhoria statusMelhoria) {
        this.statusMelhoria = statusMelhoria;
    }
}
