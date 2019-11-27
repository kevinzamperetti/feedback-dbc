package br.com.dbccompany.feedbackDBC.Integration;

import br.com.dbccompany.feedbackDBC.Controller.MelhoriaController;
import br.com.dbccompany.feedbackDBC.FeedbackDbcApplicationTests;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

public class MelhoriaIntegrationTest extends FeedbackDbcApplicationTests {
    private MockMvc mockMvc;

    @Autowired
    private MelhoriaController melhoriaController;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.standaloneSetup( melhoriaController ).build();
    }

    @Test
    public void testGetApiComentarioStatusOk() throws Exception {
        this.mockMvc.perform( MockMvcRequestBuilders.get( "/api/melhoria/" ) ).andExpect( MockMvcResultMatchers.status().isOk() );
    }
}
