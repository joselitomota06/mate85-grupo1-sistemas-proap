package br.ufba.proap.authentication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufba.proap.authentication.domain.Perfil;

public interface PerfilRepository extends JpaRepository<Perfil, Long> {

	@Query(value = "SELECT  * FROM AUT_PERFIL PERFIL " + "LEFT JOIN AUT_USER_PERFIL USERPERFIL "
			+ "ON (USERPERFIL.PERFIL_ID = PERFIL.ID) " + "WHERE USERPERFIL.USER_ID = :ID", nativeQuery = true)
	List<Perfil> findByIdUser(Long id);

}
