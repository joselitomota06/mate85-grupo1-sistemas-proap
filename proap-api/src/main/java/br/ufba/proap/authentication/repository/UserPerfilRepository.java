package br.ufba.proap.authentication.repository;

import java.util.List;

import br.ufba.proap.authentication.domain.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPerfilRepository extends JpaRepository<Perfil, Long> {

	List<Perfil> findByUserId(Long id);

}
