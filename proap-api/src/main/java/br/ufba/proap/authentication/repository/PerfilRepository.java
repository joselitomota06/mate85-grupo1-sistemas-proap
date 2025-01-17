package br.ufba.proap.authentication.repository;

import java.util.List;
import java.util.Optional;

import br.ufba.proap.authentication.domain.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PerfilRepository extends JpaRepository<Perfil, Long> {

	@Query(value = "SELECT  * FROM AUT_PERFIL PERFIL " + "LEFT JOIN AUT_USER_PERFIL USERPERFIL "
			+ "ON (USERPERFIL.PERFIL_ID = PERFIL.ID) " + "WHERE USERPERFIL.USER_ID = :id", nativeQuery = true)
	List<Perfil> findByIdUser(Long id);

	@Query(value = "SELECT * FROM AUT_PERFIL WHERE NAME = :name", nativeQuery = true)
	Optional<Perfil> findByName(@Param("name") String name);

	@Query("SELECT p FROM Perfil p JOIN FETCH p.permissions")
	List<Perfil> findAllWithPermissions();

}
