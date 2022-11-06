package br.ufba.proap.assistancerequest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.assistancerequest.domain.AssistanceRequestDTO;
import br.ufba.proap.assistancerequest.repository.AssistanteRequestRepository;
import br.ufba.proap.authentication.domain.User;

@Service
public class AssistanceRequestService{

	@Autowired
	private AssistanteRequestRepository assistanteRequestRepository;

	public List<AssistanceRequestDTO> findAll() {
		return assistanteRequestRepository.findAll();
	}

	public List<AssistanceRequestDTO> findByUser(User user) {
		return assistanteRequestRepository.findByUser(user);
	}
	
	public Optional<AssistanceRequestDTO> findById(Long id) {
		return assistanteRequestRepository.findById(id);
	}

	public AssistanceRequestDTO save(AssistanceRequestDTO assistanceReques) {
		return assistanteRequestRepository.save(assistanceReques);
	}

	public void delete(AssistanceRequestDTO assistanceRequestDTO) {
		assistanteRequestRepository.delete(assistanceRequestDTO);	
	}
}
