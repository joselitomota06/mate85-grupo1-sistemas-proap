package br.ufba.proap.authentication.service;

import java.util.List;
import java.util.Optional;

import br.ufba.proap.authentication.domain.Perfil;
import br.ufba.proap.authentication.repository.PerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PerfilService {

	@Autowired
	private PerfilRepository perfilRepository;

	public Perfil create(Perfil userPhoto) {
		return perfilRepository.saveAndFlush(userPhoto);
	}

	public Perfil update(Perfil userPhoto) {
		return perfilRepository.save(userPhoto);
	}

	public List<Perfil> findAll() {
		return perfilRepository.findAll();
	}

	public Optional<Perfil> findById(Long id) {
		return perfilRepository.findById(id);
	}

	public List<Perfil> findByUserId(Long id) {
		return perfilRepository.findByIdUser(id);
	}

	public void remove(Perfil userPhoto) {
		perfilRepository.delete(userPhoto);
	}

}
