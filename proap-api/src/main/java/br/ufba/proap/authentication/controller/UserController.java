package br.ufba.proap.authentication.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufba.proap.authentication.domain.Perfil;
import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.domain.dto.UpdatePasswordDTO;
import br.ufba.proap.authentication.domain.dto.UserResponseDTO;
import br.ufba.proap.authentication.service.PerfilService;
import br.ufba.proap.authentication.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService service;

	@Autowired
	private PerfilService perfilService;

	@PostMapping("/create")
	public ResponseEntity<User> create(@RequestBody User user) {
		try {
			return ResponseEntity.ok().body(service.create(user));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@GetMapping("/list")
	public ResponseEntity<List<UserResponseDTO>> list() {
		try {
			User currentUser = service.getLoggedUser();
			if (currentUser.getPerfil() == null || !currentUser.getPerfil().isAdmin()) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			}

			List<User> users = service.findAll();
			List<UserResponseDTO> usersDto = users.stream().map(user -> {
				String perfilName = user.getPerfil() != null ? user.getPerfil().getName() : PerfilEnum.COMUM.getName();
				return new UserResponseDTO(user.getName(), user.getEmail(), user.getCpf(), user.getRegistration(),
						user.getPhone(), user.getAlternativePhone(), perfilName);
			}).toList();
			return ResponseEntity.ok().body(usersDto);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PutMapping("/forgot")
	public ResponseEntity<String> updateCustomerContacts(@RequestBody UpdatePasswordDTO up) {
		try {
			service.updateCustomerContacts(up);
			return ResponseEntity.ok().body("Senha alterada com sucesso!");
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.ok().body("Usuário Não encontrado");
		}
	}

	@PutMapping("/set-admin/{email}")
	public ResponseEntity<String> setAdminUser(@PathVariable String email) {
		try {
			User currentUser = service.getLoggedUser();

			if (currentUser == null)
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

			if (currentUser.getPerfil() == null || !currentUser.getPerfil().isAdmin())
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

			Optional<User> user = service.findByEmail(email);
			Optional<Perfil> adminPerfil = perfilService.findByName(PerfilEnum.ADMIN.getName());

			if (user.isPresent() && adminPerfil.isPresent()) {
				user.get().setPerfil(adminPerfil.get());
				service.update(user.get());
			}

			return ResponseEntity.ok().body("Atulização realizada com sucesso!");
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@PutMapping("/update")
	public ResponseEntity<User> update(@RequestBody User user) {
		try {
			return ResponseEntity.ok().body(service.update(user));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@DeleteMapping("/remove/{id}")
	public ResponseEntity<String> remove(@PathVariable Long id) {
		try {
			Optional<User> user = service.findById(id);

			if (user.isPresent()) {
				service.remove(user.get());
				return ResponseEntity.ok().body("Successfully removed");
			}

			return ResponseEntity.notFound().build();

		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

}
