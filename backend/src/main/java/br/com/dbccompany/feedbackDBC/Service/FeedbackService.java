package br.com.dbccompany.feedbackDBC.Service;

import br.com.dbccompany.feedbackDBC.Entity.*;
import br.com.dbccompany.feedbackDBC.Repository.FeedbackRepository;
import br.com.dbccompany.feedbackDBC.Repository.MelhoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService extends AbstractService<Feedback, FeedbackRepository>{
    @Autowired
    FeedbackRepository repository;

    @Autowired
    ProjetoService projetoService;

    @Autowired
    UsuarioService usuarioService;

    @Transactional(rollbackFor = Exception.class)
    public Feedback salvarProjetoFeedback( Feedback feedback ) throws Exception {
        Projeto projeto = projetoService.buscarPorId(feedback.getProjeto().getId());
        Usuario funcionario = usuarioService.buscarPorId(feedback.getFuncionario().getId());

        if(projeto != null) {
            feedback.setProjeto(projeto);
        }
        if(funcionario != null) {
            feedback.setFuncionario(funcionario);
        }

        return repository.save( feedback );
    }

}
