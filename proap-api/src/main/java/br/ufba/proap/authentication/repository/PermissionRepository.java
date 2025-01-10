package br.ufba.proap.authentication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufba.proap.authentication.domain.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
}