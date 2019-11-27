//package br.com.dbccompany.feedbackDBC.Entity;
//
//import javax.persistence.*;
//
//@Entity
//@Table(name = "FEEDBACKS_X_MELHORIAS")
//public class FeedbackXMelhoria extends AbstractEntity {
//    @Id
//    @Column(name = "ID_FEEDBACKS_X_MELHORIAS")
//    @SequenceGenerator(allocationSize = 1, name = "FEEDBACKS_X_MELHORIAS_SEQ", sequenceName = "FEEDBACKS_X_MELHORIAS_SEQ")
//    @GeneratedValue(generator = "FEEDBACKS_X_MELHORIAS_SEQ", strategy = GenerationType.SEQUENCE)
//    private Integer id;
//
//    @ManyToOne
//    @JoinColumn(name = "FK_ID_FEEDBACK")
//    private Feedback feedback;
//
//    @ManyToOne
//    @JoinColumn(name = "FK_ID_MELHORIA")
//    private Melhoria melhoria;
//
//    @Override
//    public Integer getId() {
//        return id;
//    }
//
//    @Override
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public Feedback getFeedback() {
//        return feedback;
//    }
//
//    public void setFeedback(Feedback feedback) {
//        this.feedback = feedback;
//    }
//
//    public Melhoria getMelhoria() {
//        return melhoria;
//    }
//
//    public void setMelhoria(Melhoria melhoria) {
//        this.melhoria = melhoria;
//    }
//}