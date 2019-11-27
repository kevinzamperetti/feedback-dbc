package br.com.dbccompany.feedbackDBC.Integration;

import br.com.dbccompany.feedbackDBC.Controller.UsuarioController;
import br.com.dbccompany.feedbackDBC.FeedbackDbcApplicationTests;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

public class UsuarioIntegrationTest extends FeedbackDbcApplicationTests {

    private MockMvc mockMvc;

    @Autowired
    private UsuarioController usuarioController;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.standaloneSetup( usuarioController ).build();
    }

    @Test
    public void testGetApiUsuarioStatusOk() throws Exception {
        this.mockMvc.perform( MockMvcRequestBuilders.get( "/api/usuario/" ) ).andExpect( MockMvcResultMatchers.status().isOk() );
    }

}
