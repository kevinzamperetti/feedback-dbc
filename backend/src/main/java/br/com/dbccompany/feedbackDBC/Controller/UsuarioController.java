package br.com.dbccompany.feedbackDBC.Controller;

import br.com.dbccompany.feedbackDBC.Entity.Feedback;
import br.com.dbccompany.feedbackDBC.Entity.Projeto;
import br.com.dbccompany.feedbackDBC.Entity.Usuario;
import br.com.dbccompany.feedbackDBC.Repository.UsuarioRepository;
import br.com.dbccompany.feedbackDBC.Service.FeedbackService;
import br.com.dbccompany.feedbackDBC.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/api/usuario")
public class UsuarioController extends AbstractController<Usuario, UsuarioRepository, UsuarioService>{
    @Autowired
    UsuarioService usuarioService;

    @Autowired
    FeedbackService feedbackService;

    @GetMapping(value = "/todosGestores" )
    @ResponseBody
    public List<Usuario> todosGestores(){
        List<Usuario> usuarios = usuarioService.todosGestores();
        for(Usuario usuario : usuarios){
            if(usuario.getProjetos() != null){
                usuario.setProjetos(null);
            }
        }
         return usuarios;
    }

    @GetMapping(value = "/todosFuncionarios" )
    @ResponseBody
    public List<Usuario> todosFuncionarios() throws Exception {
        List<Usuario> usuarios = usuarioService.todosFuncionarios();
        for(Usuario usuario : usuarios){
            if(usuario.getFeedbackList() != null){
                usuario.setFeedbackList(null);
            }
        }
        return usuarios;
    }

    @GetMapping(value = "/todos")
    @ResponseBody
    public List<Usuario> todos () throws Exception {
        List<Usuario> usuarios = super.todos();
        for (Usuario usuario : usuarios) {
            if ( usuario.getFeedbackList() != null ) {
                usuario.setFeedbackList( null );
            }
            if ( usuario.getProjetoXUsuarioList() != null ) {
                usuario.setFeedbackList( null );
            }
            if ( usuario.getProjetos() != null ) {
                usuario.setProjetos( null );
            }
        }
        return usuarios;
    }

}
