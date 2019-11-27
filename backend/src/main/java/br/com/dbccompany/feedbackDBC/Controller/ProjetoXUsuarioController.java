package br.com.dbccompany.feedbackDBC.Controller;

import br.com.dbccompany.feedbackDBC.Entity.ProjetoXUsuario;
import br.com.dbccompany.feedbackDBC.Repository.ProjetoXUsuarioRepository;
import br.com.dbccompany.feedbackDBC.Service.ProjetoXUsuarioService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/api/projeto_x_usuario")
public class ProjetoXUsuarioController extends AbstractController<ProjetoXUsuario, ProjetoXUsuarioRepository, ProjetoXUsuarioService>{
}
