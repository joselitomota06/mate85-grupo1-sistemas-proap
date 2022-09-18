package br.ufba.proap.authentication.service;

import java.util.List;
import java.util.Optional;

import br.ufba.proap.authentication.domain.Perfil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.authentication.repository.UserPerfilRepository;

@Service
public class PerfilService {

	@Autowired
	private UserPerfilRepository userPhotoRepository;

	public Perfil create(Perfil userPhoto) {
		return userPhotoRepository.saveAndFlush(userPhoto);
	}

	public Perfil update(Perfil userPhoto) {
		return userPhotoRepository.save(userPhoto);
	}

	public List<Perfil> findAll() {
		return userPhotoRepository.findAll();
	}

	public Optional<Perfil> findById(Long id) {
		return userPhotoRepository.findById(id);
	}

	public List<Perfil> findByUserId(Long id) {
		return userPhotoRepository.findByUserId(id);
	}

	public void remove(Perfil userPhoto) {
		userPhotoRepository.delete(userPhoto);
	}

}
