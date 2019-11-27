package br.com.dbccompany.feedbackDBC.Controller;

import br.com.dbccompany.feedbackDBC.Entity.*;
import br.com.dbccompany.feedbackDBC.Repository.MelhoriaRepository;
import br.com.dbccompany.feedbackDBC.Service.FeedbackService;
import br.com.dbccompany.feedbackDBC.Service.MelhoriaService;
import br.com.dbccompany.feedbackDBC.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/api/melhoria")
public class MelhoriaController extends AbstractController<Melhoria, MelhoriaRepository, MelhoriaService>{

}

