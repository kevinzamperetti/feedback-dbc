package br.com.dbccompany.feedbackDBC.Service;

import br.com.dbccompany.feedbackDBC.Entity.Feedback;
import br.com.dbccompany.feedbackDBC.Entity.Melhoria;
import br.com.dbccompany.feedbackDBC.Repository.MelhoriaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MelhoriaService extends AbstractService <Melhoria, MelhoriaRepository> {

}
