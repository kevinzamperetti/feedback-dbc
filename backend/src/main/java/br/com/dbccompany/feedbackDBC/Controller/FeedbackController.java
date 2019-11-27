package br.com.dbccompany.feedbackDBC.Controller;

import br.com.dbccompany.feedbackDBC.Entity.Comentario;
import br.com.dbccompany.feedbackDBC.Entity.Feedback;
import br.com.dbccompany.feedbackDBC.Entity.Projeto;
import br.com.dbccompany.feedbackDBC.Repository.FeedbackRepository;
import br.com.dbccompany.feedbackDBC.Service.ComentarioService;
import br.com.dbccompany.feedbackDBC.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(value = "/api/feedback")
public class FeedbackController extends AbstractController<Feedback, FeedbackRepository, FeedbackService>{

    @Autowired
    FeedbackService feedbackService;


    @PostMapping( value = "/novo-feedback" )
    @ResponseBody
    public Feedback novo( @RequestBody Feedback feedback ) throws Exception {
        Feedback feedbackSalvo = feedbackService.salvarProjetoFeedback( feedback );
        return feedbackSalvo;
    }

    @PutMapping( value = "/editar-feedback/{id}" )
    @ResponseBody
    public Feedback editarFeedback(@PathVariable Integer id ,@RequestBody Feedback feedback ) throws Exception {
        return feedbackService.editar(id, feedback);
    }

    @GetMapping( value = "/todos")
    @ResponseBody
    public List<Feedback> todosFeedbacks() throws Exception {
        List<Feedback> feedbacks = super.todos();

        for (Feedback feedback : feedbacks) {
            if (feedback.getFuncionario().getFeedbackList() != null) {
                feedback.getFuncionario().setFeedbackList(null);
            }
            if(feedback.getProjeto().getUsuarioGestor() != null){
                feedback.getProjeto().setUsuarioGestor(null);
            }
            if(feedback.getProjeto().getFeedbackList() != null){
                feedback.getProjeto().setFeedbackList(null);
            }
            if(feedback.getComentarios() != null){
                feedback.setComentarios(null);
            }

        }
        return feedbacks;
    }

    @GetMapping( value = "/{id}")
    @ResponseBody
    public Feedback buscarFeedbackPorId( @PathVariable Integer id ) throws Exception {
        Feedback feedback = service.buscarPorId( id );

        if(feedback.getFuncionario().getFeedbackList() != null){
            feedback.getFuncionario().setFeedbackList(null);
        }

        if(feedback.getProjeto().getUsuarioGestor().getProjetos() != null){
            feedback.getProjeto().getUsuarioGestor().setProjetos(null);
        }

        if(feedback.getProjeto().getFeedbackList() != null){
            feedback.getProjeto().setFeedbackList(null);
        }

        for(Comentario comentario : feedback.getComentarios()){
            if(comentario.getFeedback() != null){
                comentario.setFeedback(null);
            }
        }

        return feedback;
    }

    @GetMapping( value = "/detalhamento-feedback/{id}")
    @ResponseBody
    public Feedback buscarDetalhamentoFeedbackPorId( @PathVariable Integer id ) throws Exception {
        return service.buscarPorId( id );
    }
}

