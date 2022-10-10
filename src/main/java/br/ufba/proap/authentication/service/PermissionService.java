package br.ufba.proap.authentication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.authentication.domain.Permission;
import br.ufba.proap.authentication.repository.PermissionRepository;

@Service
public class PermissionService {

	@Autowired
	private PermissionRepository permissionRepository;

	public Permission create(Permission permission) {
		return permissionRepository.saveAndFlush(permission);
	}

	public Permission update(Permission permission) {
		return permissionRepository.save(permission);
	}

	public void updatePermission(Permission permission) {
		permissionRepository.save(permission);
	}

	public List<Permission> findAll() {
		return permissionRepository.findAll();
	}

	public Optional<Permission> findById(Long id) {
		return permissionRepository.findById(id);
	}

	public List<Permission> findByPerfilId(Long perfilId) {
		return permissionRepository.findByPerfilId(perfilId);
	}

	public void remove(Permission permission) {
		permissionRepository.delete(permission);
	}

}
