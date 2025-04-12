package br.ufba.proap.authentication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

@Disabled
@SpringBootTest
@AutoConfigureMockMvc
public class PasswordResetEndpointTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void sendPasswordResetTokenTest() throws Exception {
        mockMvc.perform(post("/authentication/reset-password").param("email", "aluno@aluno.com"))
                .andExpect(status().isOk());
    }

    @Test
    public void resetPasswordTest() throws Exception {
        String token = "6280d28e-8961-4f62-aa9f-1ff5d2746ed5";
        mockMvc.perform(post("/authentication/reset-password/confirm").param("token", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"newPassword\":\"Mendes290199\"}")).andExpect(status().isOk());
    }
}
