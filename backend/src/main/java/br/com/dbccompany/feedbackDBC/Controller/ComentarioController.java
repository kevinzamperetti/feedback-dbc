package br.com.dbccompany.feedbackDBC.Controller;

import br.com.dbccompany.feedbackDBC.Entity.Comentario;
import br.com.dbccompany.feedbackDBC.Entity.Feedback;
import br.com.dbccompany.feedbackDBC.Repository.ComentarioRepository;
import br.com.dbccompany.feedbackDBC.Service.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/comentario")
public class ComentarioController extends AbstractController <Comentario, ComentarioRepository, ComentarioService>{

    @Autowired
    ComentarioService comentarioService;

    @PostMapping( value = "/novo-comentario" )
    @ResponseBody
    public Comentario novo( @RequestBody Comentario comentario ) throws Exception {
        Comentario comentarioSalvo = comentarioService.salvarComentarioFeedback( comentario );
        return comentarioSalvo;
    }

    @GetMapping( value = "/todos")
    @ResponseBody
    public List<Comentario> buscarTodosComentarios() throws Exception {
        List<Comentario> comentarios = service.todos();

        for(Comentario comentario : comentarios){
            if(comentario.getFeedback().getComentarios() != null){
                comentario.getFeedback().setComentarios(null);
            }

            if(comentario.getFeedback().getFuncionario().getFeedbackList() != null){
                comentario.getFeedback().getFuncionario().setFeedbackList(null);
            }

            if(comentario.getFeedback().getProjeto().getUsuarioGestor().getProjetos() != null){
                comentario.getFeedback().getProjeto().getUsuarioGestor().setProjetos(null);
            }

            if(comentario.getFeedback().getProjeto().getFeedbackList() != null){
                comentario.getFeedback().getProjeto().setFeedbackList(null);
            }
        }

        return comentarios;
    }
}
