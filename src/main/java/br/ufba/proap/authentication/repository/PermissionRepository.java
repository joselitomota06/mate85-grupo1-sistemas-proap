package br.ufba.proap.authentication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufba.proap.authentication.domain.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long>{

	List<Permission> findByPerfilId(Long perfilId); 

}