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

import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.domain.dto.UpdatePasswordDTO;
import br.ufba.proap.authentication.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findByEmail(email);
		
		if(user.isPresent()) {
			return user.get();
			
		}else {
			throw new UsernameNotFoundException("Email user: " + email + " not found");
			
		}
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
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.saveAndFlush(user);
	}

	public User update(User user) {
		return userRepository.save(user);
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}

	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public User updateCustomerContacts(UpdatePasswordDTO up) {
	    User myCustomer = userRepository.findByEmailAndCPF(up.getEmail(), up.getCpf());
	    myCustomer.setPassword(passwordEncoder.encode(up.getPassword()));
	    return userRepository.save(myCustomer);
	}

	public void remove(User user) {
		userRepository.delete(user);
	}

}