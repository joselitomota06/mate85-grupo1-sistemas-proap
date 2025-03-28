package br.ufba.proap.authentication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.ufba.proap.authentication.domain.Perfil;
import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.domain.dto.UserUpdateDTO;
import br.ufba.proap.authentication.repository.UserRepository;
import jakarta.validation.ValidationException;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PerfilService perfilService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findByEmailWithPerfilAndPermissions(email);

		if (!user.isPresent()) {
			throw new UsernameNotFoundException("Email user: " + email + " not found");
		}
		return user.get();
	}

	public User getLoggedUser() {
		String username = "";
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			username = ((UserDetails) principal).getUsername();
		} else {
			username = principal.toString();
		}

		return (User) this.loadUserByUsername(username);
	}

	public User create(User user) {
		Perfil defaultPerfil = perfilService.findByName(Perfil.getDefaultPerfilName()).orElse(null);
		user.setPerfil(defaultPerfil);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.saveAndFlush(user);
	}

	public User update(UserUpdateDTO user) {
		User loggedUser = getLoggedUser();

		if (user.getName() != null && !user.getName().isEmpty()) {
			loggedUser.setName(user.getName());
		}
		if (user.getRegistrationNumber() != null && !user.getRegistrationNumber().isEmpty()) {
			loggedUser.setRegistration(user.getRegistrationNumber());
		}
		if (user.getPhone() != null && !user.getPhone().isEmpty()) {
			loggedUser.setPhone(user.getPhone());
		}
		if (user.getAlternativePhone() != null) {
			loggedUser.setAlternativePhone(user.getAlternativePhone());
		}
		return userRepository.save(loggedUser);
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public List<User> getAllUsersWithPerfilAndPermissions() {
		return userRepository.findAllWithPerfilAndPermissions();
	}

	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}

	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public void remove(User user) {
		userRepository.delete(user);
	}

	public void changePassword(String currentPassword, String newPassword) throws ValidationException {
		User loggedUser = getLoggedUser();
		if (!passwordEncoder.matches(currentPassword, loggedUser.getPassword())) {
			throw new ValidationException("Senha atual incorreta");
		}
		if (currentPassword.equals(newPassword)) {
			throw new ValidationException("A nova senha não pode ser igual a senha atual");
		}
		this.updatePassword(loggedUser, newPassword);

	}

	public void updatePassword(User user, String password) {
		user.setPassword(passwordEncoder.encode(password));
		userRepository.saveAndFlush(user);
	}

}