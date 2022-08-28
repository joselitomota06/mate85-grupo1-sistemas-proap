package br.ufba.proap.authentication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.authentication.domain.UserPerfil;
import br.ufba.proap.authentication.repository.UserPerfilRepository;

@Service
public class UserPerfilService {

	@Autowired
	private UserPerfilRepository userPhotoRepository;

	public UserPerfil create(UserPerfil userPhoto) {
		return userPhotoRepository.saveAndFlush(userPhoto);
	}

	public UserPerfil update(UserPerfil userPhoto) {
		return userPhotoRepository.save(userPhoto);
	}

	public void updateUserPerfil(UserPerfil userPhoto) {
		userPhotoRepository.save(userPhoto);
	}

	public List<UserPerfil> findAll() {
		return userPhotoRepository.findAll();
	}

	public Optional<UserPerfil> findById(Long id) {
		return userPhotoRepository.findById(id);
	}

	public List<UserPerfil> findByUserId(Long id) {
		return userPhotoRepository.findByUserId(id);
	}

	public void remove(UserPerfil userPhoto) {
		userPhotoRepository.delete(userPhoto);
	}

}
