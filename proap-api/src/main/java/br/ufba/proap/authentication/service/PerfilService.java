package br.ufba.proap.authentication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.authentication.domain.Perfil;
import br.ufba.proap.authentication.repository.PerfilRepository;

@Service
public class PerfilService {

	@Autowired
	private PerfilRepository perfilRepository;

	public Perfil create(Perfil perfil) {
		return perfilRepository.saveAndFlush(perfil);
	}

	public Perfil update(Perfil perfil) {
		return perfilRepository.save(perfil);
	}

	public void updatePerfil(Perfil perfil) {
		perfilRepository.save(perfil);
	}

	public List<Perfil> findAll() {
		return perfilRepository.findAll();
	}

	public Optional<Perfil> findById(Long id) {
		return perfilRepository.findById(id);
	}

	public List<Perfil> findByIdUser(Long id) {
		return perfilRepository.findByIdUser(id);
	}

	public void remove(Perfil perfil) {
		perfilRepository.delete(perfil);
	}

}
