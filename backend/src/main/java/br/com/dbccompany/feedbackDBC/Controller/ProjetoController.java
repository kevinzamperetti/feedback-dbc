package br.com.dbccompany.feedbackDBC.Controller;

import br.com.dbccompany.feedbackDBC.Entity.Projeto;
import br.com.dbccompany.feedbackDBC.Repository.ProjetoRepository;
import br.com.dbccompany.feedbackDBC.Service.ProjetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.constraints.Null;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(value = "/api/projeto")
public class ProjetoController extends AbstractController<Projeto, ProjetoRepository, ProjetoService> {
    @Autowired
    ProjetoService projetoService;

    @GetMapping(value = "/todos")
    @ResponseBody
    public List<Projeto> todosProjetos () throws Exception {
        List<Projeto> projetos = super.todos();
        for (Projeto projeto : projetos) {
            if ( projeto.getFeedbackList() != null ) {
                projeto.setFeedbackList( null );
            }
            if(projeto.getUsuarioGestor().getProjetos() != null){
                projeto.getUsuarioGestor().setProjetos(null);
            }
        }
        return projetos;
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public Projeto buscarProjetoPorId (@PathVariable Integer id ) throws Exception {
        Projeto projeto = service.buscarPorId(id);

        if(projeto.getUsuarioGestor().getProjetos() != null){
            projeto.getUsuarioGestor().setProjetos(null);
        }

        if(projeto.getFeedbackList() != null){
            projeto.setFeedbackList(null);
        }

        return projeto;
    }
}
