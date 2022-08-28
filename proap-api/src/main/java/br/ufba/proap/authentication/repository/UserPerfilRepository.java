package br.ufba.proap.authentication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufba.proap.authentication.domain.UserPerfil;

public interface UserPerfilRepository extends JpaRepository<UserPerfil, Long> {

	List<UserPerfil> findByUserId(Long id);

}
