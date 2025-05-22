package br.ufba.proap.authentication.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ufba.proap.authentication.domain.PasswordResetToken;
import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.repository.PasswordResetTokenRepository;

import br.ufba.proap.mailsender.event.PasswordResetTokenEvent;

import jakarta.ws.rs.NotFoundException;

@Service
public class PasswordResetTokenService {

    private static final int EXPIRATION = 60;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    @Transactional
    public String createResetToken(String email) {
        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new NotFoundException("Usuário não encontrado");
        }
        User user = userOpt.get();
        String token = generateToken();

        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByUser(user);
        if (tokenOpt.isPresent()) {
            tokenOpt.get().setToken(token);
            tokenOpt.get().setExpiryDate(LocalDateTime.now().plusMinutes(EXPIRATION));
            try {
                tokenRepository.save(tokenOpt.get());
            } catch (DataAccessException e) {
                throw new DataAccessException("Erro ao salvar token") {
                };
            }
        } else {
            PasswordResetToken passwordResetToken = new PasswordResetToken();
            passwordResetToken.setToken(token);
            passwordResetToken.setUser(user);
            passwordResetToken.setExpiryDate(LocalDateTime.now().plusMinutes(EXPIRATION));
            try {
                tokenRepository.save(passwordResetToken);
            } catch (DataAccessException e) {
                throw new DataAccessException("Erro ao salvar token") {
                };
            }
        }
        return token;
    }

    public void sendResetToken(String email) {
        String token = createResetToken(email);
        eventPublisher.publishEvent(new PasswordResetTokenEvent(email, token));
    }

    public Boolean isPasswordResetTokenValid(String token) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isEmpty()) {
            throw new NotFoundException("Token não encontrado");
        }
        PasswordResetToken passwordResetToken = tokenOpt.get();
        if (passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new NotFoundException("Token expirado");
        }
        return true;
    }

    @Transactional
    public void updatePassword(String token, String newPassword) {
        User user = tokenRepository.findByToken(token).get().getUser();
        try {
            userService.updatePassword(user, newPassword);
        } catch (DataAccessException e) {
            throw new DataAccessException("Erro ao atualizar senha") {
            };
        }
    }

    @Transactional
    public void deleteToken(String token) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isEmpty()) {
            throw new NotFoundException("Token não encontrado");
        }
        try {
            tokenRepository.delete(tokenOpt.get());
        } catch (DataAccessException e) {
            throw new DataAccessException("Erro ao deletar token") {
            };
        }
    }

}
