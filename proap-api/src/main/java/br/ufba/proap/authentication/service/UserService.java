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
import br.ufba.proap.authentication.domain.dto.UpdatePasswordDTO;
import br.ufba.proap.authentication.repository.UserRepository;

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

	public User update(User user) {
		return userRepository.save(user);
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

	public User updateCustomerContacts(UpdatePasswordDTO up) throws IllegalArgumentException {
		User myCustomer = userRepository.findByEmailAndCPF(up.getEmail(), up.getCpf());

		if (myCustomer == null)
			throw new IllegalArgumentException("Algum parâmetro informado está incorreto. Favor verificar.");

		if (up.getPassword() == null)
			throw new IllegalArgumentException("Algum parâmetro informado está incorreto. Favor verificar.");

		myCustomer.setPassword(passwordEncoder.encode(up.getPassword()));
		return userRepository.save(myCustomer);
	}

	public void remove(User user) {
		userRepository.delete(user);
	}

}