package br.ufba.proap.assistancerequest.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import br.ufba.proap.assistancerequest.domain.Review;
import br.ufba.proap.assistancerequest.domain.dto.ReviewDTO;
import br.ufba.proap.assistancerequest.service.ReviewService;
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

import br.ufba.proap.assistancerequest.domain.AssistanceRequestDTO;
import br.ufba.proap.assistancerequest.service.AssistanceRequestService;
import br.ufba.proap.authentication.controller.UserController;
import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.service.UserService;

@RestController
@RequestMapping("assistancerequest")
public class AssistanceRequestController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private AssistanceRequestService service;

	@Autowired
	private ReviewService reviewService;
	
	@Autowired
	private UserService serviceUser;
	
	
	
	@GetMapping("/list")
	public List<AssistanceRequestDTO> list() {
		
		User currentUser = serviceUser.getLoggedUser();
		
		if(currentUser == null) {
			return Collections.emptyList();
		}
		
		try {
			
			return service.findAll();
		
		} catch (Exception e) {
			return Collections.emptyList();
		}
	
	}
	
	@GetMapping("/listById/{id}")
	public Optional<AssistanceRequestDTO> listById(@PathVariable Long id) {	
		try {
			return service.findById(id);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return Optional.empty();
		}
	}
	
	
	@PostMapping("/create")
	public ResponseEntity<AssistanceRequestDTO> create(@RequestBody AssistanceRequestDTO assistanceReques) {
		
		User currentUser = serviceUser.getLoggedUser();
		
	
		if(currentUser == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		
		
		try {
			assistanceReques.setUser(currentUser);
			
			String nomeUsuario = currentUser.getName();
			String emailUsuario = currentUser.getEmail();
			
			
			assistanceReques.setNomeSolicitante(nomeUsuario);
			assistanceReques.setEmailSolicitacao(emailUsuario);
			
			return ResponseEntity.ok().body(service.save(assistanceReques));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@PutMapping("/update")
	public ResponseEntity<AssistanceRequestDTO> update(@RequestBody AssistanceRequestDTO assistanceReques) {
		try {
			return ResponseEntity.ok().body(service.save(assistanceReques));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	
	@DeleteMapping("/remove/{id}")
	public ResponseEntity<String> remove(@PathVariable Long id) {
		
		User currentUser = serviceUser.getLoggedUser();
		
		if(currentUser == null) {
			return (ResponseEntity<String>) Collections.emptyList();
		}
		
		
		try {
			Optional<AssistanceRequestDTO> assistanceReques = service.findById(id);
	
			if (assistanceReques.isPresent()) {
				service.delete(assistanceReques.get());
				return ResponseEntity.ok().body("Successfully removed");
			}
	
			return ResponseEntity.notFound().build();
	
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@PutMapping("/approve/{requestId}")
	public ResponseEntity<Review> approveRequest(
			@PathVariable String requestId,
			@RequestBody ReviewDTO reviewDTO
			) {
		User currentUser = serviceUser.getLoggedUser();

		if(currentUser == null) {
			return ResponseEntity.badRequest().build();
		}
		// TODO : Validar se o usuario pode aprovar

		try {
			return ResponseEntity.ok().body(reviewService.approve(reviewDTO));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.badRequest().build();
		}
	}

	@PutMapping("/reprove/{requestId}")
	public ResponseEntity<Review> reproveRequest(
			@PathVariable String requestId,
			@RequestBody ReviewDTO reviewDTO
	) {
		User currentUser = serviceUser.getLoggedUser();

		if(currentUser == null) {
			return ResponseEntity.badRequest().build();
		}
		// TODO : Validar se o usuario pode aprovar

		try {
			return ResponseEntity.ok().body(reviewService.reprove(reviewDTO));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.badRequest().build();
		}
	}
}
