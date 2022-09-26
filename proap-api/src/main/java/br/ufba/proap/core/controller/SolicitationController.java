package br.ufba.proap.core.controller;

import java.util.Collections;
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

import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.service.UserService;
import br.ufba.proap.core.domain.Solicitation;
import br.ufba.proap.core.service.SolicitationService;

@RestController
@RequestMapping("/solicitation")
public class SolicitationController {

	private static final Logger logger = LoggerFactory.getLogger(SolicitationController.class);
	
	@Autowired
	private UserService serviceUser;
	
	@Autowired
	private SolicitationService service;

	@PostMapping("/create")
	public ResponseEntity<Solicitation> create(@RequestBody Solicitation request) {
		try {
			return ResponseEntity.ok().body(service.create(request));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@PutMapping("/update")
	public ResponseEntity<Solicitation> update(@RequestBody Solicitation request) {
		try {
			return ResponseEntity.ok().body(service.update(request));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@GetMapping("/list")
	public List<Solicitation> list() {
		User currentUser = serviceUser.getLoggedUser();
		
		if(currentUser == null) {
			return Collections.emptyList();
		}
		
		
		try {
			if(currentUser.getPerfil().isAdmin()) {
				return service.findAll();
				
				
				
			}
		
		} catch (Exception e) {
			return Collections.emptyList();
		}
		
		
		return null;
			
		
	}

	@DeleteMapping("/remove/{id}")
	public ResponseEntity<String> remove(@PathVariable Long id) {
		try {
			Optional<Solicitation> solicitation = service.findById(id);

			if (solicitation.isPresent()) {
				service.remove(solicitation.get());
				return ResponseEntity.ok().body("Successfully removed");
			}

			return ResponseEntity.notFound().build();

		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
}
