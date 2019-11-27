package br.com.dbccompany.feedbackDBC.Integration;

import br.com.dbccompany.feedbackDBC.Controller.ComentarioController;
import br.com.dbccompany.feedbackDBC.FeedbackDbcApplicationTests;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

public class ComentarioIntegrationTest extends FeedbackDbcApplicationTests {

    private MockMvc mockMvc;

    @Autowired
    private ComentarioController comentarioController;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.standaloneSetup( comentarioController ).build();
    }

    @Test
    public void testGetApiComentarioStatusOk() throws Exception {
        this.mockMvc.perform( MockMvcRequestBuilders.get( "/api/comentario/" ) ).andExpect( MockMvcResultMatchers.status().isOk() );
    }

}
