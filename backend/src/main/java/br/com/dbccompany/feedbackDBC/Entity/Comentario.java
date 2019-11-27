package br.com.dbccompany.feedbackDBC.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@Table(name = "COMENTARIOS")
public class Comentario extends AbstractEntity{
    @Id
    @Column(name = "ID_COMENTARIO")
    @SequenceGenerator(allocationSize = 1, name = "COMENTARIO_SEQ", sequenceName = "COMENTARIO_SEQ")
    @GeneratedValue(generator = "COMENTARIO_SEQ", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "COMENTARIO", length = 300, nullable = false)
    private String comentario;

    @ManyToOne
    //@JsonIgnore
    @JoinColumn(name = "FK_ID_FEEDBACK")
    private Feedback feedback;

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Feedback getFeedback() {
        return feedback;
    }

    public void setFeedback(Feedback feedback) {
        this.feedback = feedback;
    }
}
