package br.ufba.proap.assistancerequest.controller;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.ufba.proap.assistancerequest.domain.AssistanceRequest;
import br.ufba.proap.assistancerequest.domain.Review;
import br.ufba.proap.assistancerequest.domain.dto.CreateAssistanceRequestDTO;
import br.ufba.proap.assistancerequest.domain.dto.ResponseAssistanceRequestDTO;
import br.ufba.proap.assistancerequest.domain.dto.ReviewDTO;
import br.ufba.proap.assistancerequest.service.AssistanceRequestService;
import br.ufba.proap.assistancerequest.service.ReviewService;
import br.ufba.proap.assistancerequest.service.AssistanceRequestService.AssistanceRequestListFiltered;
import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.service.UserService;
import br.ufba.proap.filestorage.FileService;

@RestController
@RequestMapping("assistancerequest")
public class AssistanceRequestController {

	private static final Logger logger = LoggerFactory.getLogger(AssistanceRequestController.class);

	@Autowired
	private AssistanceRequestService service;

	@Autowired
	private ReviewService reviewService;

	@Autowired
	private UserService serviceUser;

	@Autowired
	private FileService fileUploadService;

	@GetMapping("/list")
	public ResponseEntity<AssistanceRequestListFiltered> list(
			@RequestParam String sortBy,
			@RequestParam Boolean ascending,
			@RequestParam int page,
			@RequestParam int size) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
					new AssistanceRequestListFiltered(
							Collections.emptyList(), 0));
		}

		try {
			return ResponseEntity.ok().body(service.find(
					sortBy,
					ascending,
					page,
					size,
					currentUser));

		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.internalServerError().body(
					new AssistanceRequestService.AssistanceRequestListFiltered(
							Collections.emptyList(), 0));
		}
	}

	@GetMapping("/list/{userId}")
	public List<AssistanceRequest> listById(@PathVariable Long userId) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null)
			return Collections.emptyList();
		try {
			return service.findByUser(currentUser);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return Collections.emptyList();
		}
	}

	@GetMapping("/find/{id}")
	public ResponseEntity<ResponseAssistanceRequestDTO> findById(@PathVariable Long id) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

		try {
			Optional<AssistanceRequest> request = service.findById(id);

			if (!request.isPresent())
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

			boolean currentUserHasPermission = currentUser.getPerfil() != null
					&& currentUser.getPerfil().hasPermission("VIEW_ALL_REQUESTS");

			if (request.get().getUser() == currentUser || currentUserHasPermission) {
				ResponseAssistanceRequestDTO response = ResponseAssistanceRequestDTO.fromEntity(request.get());
				return ResponseEntity.ok().body(response);
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		return null;
	}

	@PostMapping("/create")
	public ResponseEntity<AssistanceRequest> create(@RequestBody AssistanceRequest assistanceReques) {

		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		try {

			assistanceReques.setSituacao(0);
			assistanceReques.setUser(currentUser);

			return ResponseEntity.ok().body(service.save(assistanceReques));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@PostMapping(value = "/create-with-file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseAssistanceRequestDTO> createWithFile(
			@RequestPart("form") CreateAssistanceRequestDTO form,
			@RequestPart(value = "file", required = false) MultipartFile file) {
		User currentUser = serviceUser.getLoggedUser();
		if (currentUser == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		try {
			AssistanceRequest assistanceRequest = form.toEntity();
			if (file != null) {
				String savedFileName = fileUploadService.uploadPdf(file);
				assistanceRequest.setCartaAceite(savedFileName);
			}
			assistanceRequest.setUser(currentUser);
			assistanceRequest.setSituacao(0);

			AssistanceRequest saved = service.save(assistanceRequest);

			return ResponseEntity.ok().body(ResponseAssistanceRequestDTO.fromEntity(saved));

		} catch (IllegalArgumentException e) {
			// Exemplo: não era PDF
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).build();
		} catch (IOException e) {
			// Erro de IO
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		} catch (Exception e) {
			// Qualquer outro erro
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@PutMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<AssistanceRequest> update(@RequestPart("form") ResponseAssistanceRequestDTO assistanceRequest,
			@RequestPart(value = "file", required = false) MultipartFile file) {
		try {
			User currentUser = serviceUser.getLoggedUser();
			AssistanceRequest existingInstance = service.findById(assistanceRequest.id()).orElse(null);
			if (existingInstance == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			boolean isNotOwner = !existingInstance.getUser().getEmail().equals(currentUser.getEmail());
			boolean cannotApprove = !currentUser.getPerfil().hasPermission("APPROVE_REQUEST");
			boolean isNotPending = existingInstance.getSituacao() != 0;

			if ((isNotOwner && cannotApprove) || (isNotPending && cannotApprove)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
			}

			AssistanceRequest updatedAssistanceRequest = assistanceRequest.toEntity();
			updatedAssistanceRequest.setId(existingInstance.getId());
			updatedAssistanceRequest.setUser(existingInstance.getUser());
			updatedAssistanceRequest.setCreatedAt(existingInstance.getCreatedAt());
			if (file != null) {
				String savedFileName = fileUploadService.uploadPdf(file);
				updatedAssistanceRequest.setCartaAceite(savedFileName);
			}
			return ResponseEntity.ok().body(service.save(updatedAssistanceRequest));
		} catch (IllegalArgumentException e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).build();
		} catch (IOException e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		} catch (Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@PutMapping("/reviewsolicitation")
	public ResponseEntity<AssistanceRequest> reviewsolicitation(
			@RequestBody AssistanceRequest assistanceRequest) {
		User currentUser = serviceUser.getLoggedUser();
		Optional<AssistanceRequest> assistancePersisted = service.findById(assistanceRequest.getId());

		if (currentUser == null || !assistancePersisted.isPresent()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		try {
			assistancePersisted.get().setSituacao(assistanceRequest.getSituacao());
			assistancePersisted.get().setNumeroAta(assistanceRequest.getNumeroAta());
			assistancePersisted.get().setDataAprovacao(assistanceRequest.getDataAprovacao());
			assistancePersisted.get().setNumeroDiariasAprovadas(assistanceRequest.getNumeroDiariasAprovadas());
			assistancePersisted.get().setValorAprovado(assistanceRequest.getValorAprovado());
			assistancePersisted.get().setObservacao(assistanceRequest.getObservacao());
			assistancePersisted.get().setAutomaticDecText();
			return ResponseEntity.ok().body(service.save(assistancePersisted.get()));
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@DeleteMapping("/remove/{id}")
	public ResponseEntity<String> remove(@PathVariable Long id) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

		try {
			Optional<AssistanceRequest> assistanceReques = service.findById(id);

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
	public ResponseEntity<Review> approveRequest(@PathVariable String requestId, @RequestBody ReviewDTO reviewDTO) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null) {
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
	public ResponseEntity<Review> reproveRequest(@PathVariable String requestId, @RequestBody ReviewDTO reviewDTO) {
		User currentUser = serviceUser.getLoggedUser();

		if (currentUser == null) {
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
