package br.ufba.proap.authentication.repository;

import org.springframework.stereotype.Repository;

import br.ufba.proap.authentication.domain.PasswordResetToken;
import br.ufba.proap.authentication.domain.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUser(User user);
}
