package br.ufba.proap.assistancerequest.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.ufba.proap.assistancerequest.domain.ExtraRequest;;
import br.ufba.proap.assistancerequest.domain.Review;
import br.ufba.proap.assistancerequest.domain.dto.ReviewDTO;
import br.ufba.proap.assistancerequest.service.ExtraRequestService;
import br.ufba.proap.assistancerequest.service.ExtraRequestService.ExtraRequestListFiltered;
import br.ufba.proap.assistancerequest.service.ReviewService;
import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.service.UserService;

@RestController
@RequestMapping("extrarequest")
public class ExtraRequestController {

	private static final Logger logger = LoggerFactory.getLogger(ExtraRequestController.class);

	@Autowired
	private ExtraRequestService service;

	@Autowired
	private ReviewService reviewService;

	@Autowired
	private UserService serviceUser;

	@GetMapping("/list")
	public ResponseEntity<ExtraRequestListFiltered> list(
			@RequestParam String prop,
			@RequestParam Boolean ascending,
			@RequestParam int page,
			@RequestParam int size
	) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
				new ExtraRequestListFiltered(
					Collections.emptyList(), 0
				)
			);
		}

		try {
			return ResponseEntity.ok().body(
				service.find(
						prop,
						ascending,
						page,
						size,
						currentUser
				)
			);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body(
					new ExtraRequestListFiltered(
							Collections.emptyList(), 0
					)
			);
		}
	}

	@GetMapping("/list/{userId}")
	public List<ExtraRequest> listById(@PathVariable Long userId) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null)
			return Collections.emptyList();
		/*
		if(!currentUser.getId().equals(userId))
			return Collections.emptyList();
		*/
		try {
			return service.findByUser(currentUser);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return Collections.emptyList();
		}
	}

	@GetMapping("/find/{id}")
	public Optional<ExtraRequest> findById(@PathVariable Long id) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null)
			return Optional.empty();

		try {
			Optional<ExtraRequest> request = service.findById(id);

			boolean isValid = currentUser.getPerfil() == null ||
				(!currentUser.getPerfil().isAdmin() &&
				request.isPresent() && !request.get()
				.getUser().getId().equals(currentUser.getId()));

			if(isValid)
				return Optional.empty();

			return request;
		} catch (Exception e) {
			logger.error(e.getMessage());
			return Optional.empty();
		}
	}

	
	@PostMapping("/create")
	public ResponseEntity<ExtraRequest> create(@RequestBody ExtraRequest extraRequest) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null) 
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

		try {
			extraRequest.setSituacao(0);
			extraRequest.setUser(currentUser);
			
			return ResponseEntity.ok().body(service.save(extraRequest));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@PutMapping("/update")
	public ResponseEntity<ExtraRequest> update(@RequestBody ExtraRequest extraRequest) {
		try {
			return ResponseEntity.ok().body(service.save(extraRequest));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@DeleteMapping("/remove/{id}")
	public ResponseEntity<String> remove(@PathVariable Long id) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null)
			return ResponseEntity.badRequest().build();

		try {
			Optional<ExtraRequest> extraRequest = service.findById(id);

			if (extraRequest.isPresent()) {
				service.delete(extraRequest.get());
				return ResponseEntity.ok().body("Successfully removed");
			}

			return ResponseEntity.notFound().build();

		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@PutMapping("/extrareviewsolicitation")
	public ResponseEntity<ExtraRequest> reviewextrasolicitation(@RequestBody ExtraRequest extraRequest) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		
		try {
			extraRequest.setAutomaticDecText(" ");
			
			return ResponseEntity.ok().body(service.save(extraRequest));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@PutMapping("/approve/{requestId}")
	public ResponseEntity<Review> approveRequest(@PathVariable String requestId, @RequestBody ReviewDTO reviewDTO) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null)
			return ResponseEntity.badRequest().build();

		// TODO : Validar se o usuario pode aprovar
		try {
			return ResponseEntity.ok().body(reviewService.approve(reviewDTO));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.badRequest().build();
		}
	}

	@PutMapping("/reprove/{requestId}")
	public ResponseEntity<Review> reproveRequest(@PathVariable String requestId, @RequestBody ReviewDTO reviewDTO) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null)
			return ResponseEntity.badRequest().build();

		// TODO : Validar se o usuario pode aprovar
		try {
			return ResponseEntity.ok().body(reviewService.reprove(reviewDTO));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.badRequest().build();
		}
	}

}
