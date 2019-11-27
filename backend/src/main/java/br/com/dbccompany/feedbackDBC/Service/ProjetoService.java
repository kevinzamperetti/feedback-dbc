package br.com.dbccompany.feedbackDBC.Service;

import br.com.dbccompany.feedbackDBC.Entity.Projeto;
import br.com.dbccompany.feedbackDBC.Repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjetoService extends AbstractService<Projeto, ProjetoRepository>{

}
