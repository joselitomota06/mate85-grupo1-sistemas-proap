package br.ufba.proap.authentication.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufba.proap.authentication.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query("SELECT m FROM User m WHERE m.name = :username")
	User findByName(String username);

	Optional<User>findByEmail(String email);
}
