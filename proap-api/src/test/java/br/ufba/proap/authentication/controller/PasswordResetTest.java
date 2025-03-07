package br.ufba.proap.authentication.controller;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.repository.UserRepository;
import br.ufba.proap.authentication.service.PasswordResetTokenService;

@SpringBootTest
public class PasswordResetTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;

    @Test
    public void testPasswordReset() {
        String email = "aluno@aluno.com";
        String newPassword = "Mendes290199";

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        String storedHash = user.getPassword();

        assertTrue(passwordEncoder.matches(newPassword, storedHash),
                "Password does not match the hash in the database");
    }

    @Test
    public void resetPassword() {
        String email = "aluno@aluno.com";
        String newPassword = "Mendes290199";

        String token = passwordResetTokenService.createResetToken(email);

        passwordResetTokenService.updatePassword(token, newPassword);

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        String storedHash = user.getPassword();

        assertTrue(passwordEncoder.matches(newPassword, storedHash),
                "Password does not match the hash in the database");
    }
}
