package br.com.dbccompany.feedbackDBC.Service;

import br.com.dbccompany.feedbackDBC.Entity.Comentario;
import br.com.dbccompany.feedbackDBC.Entity.Feedback;
import br.com.dbccompany.feedbackDBC.Repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ComentarioService extends AbstractService <Comentario, ComentarioRepository> {
    @Autowired
    FeedbackService feedbackService;

    @Transactional(rollbackFor = Exception.class)
    public Comentario salvarComentarioFeedback(Comentario comentario ) throws Exception {
        Feedback feedback = feedbackService.buscarPorId(comentario.getFeedback().getId());

        if(feedback != null){
            comentario.setFeedback(feedback);
        }

        return repository.save( comentario );
    }
}
