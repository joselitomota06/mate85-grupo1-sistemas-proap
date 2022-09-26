package br.ufba.proap.assistancerequest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.assistancerequest.dto.AssistanceRequestDTO;
import br.ufba.proap.assistancerequest.repository.AssistanteRequestRepository;
import br.ufba.proap.authentication.domain.User;

@Service
public class AssistanceRequestService{
	
	@Autowired
	private AssistanteRequestRepository assistanteRequestRepository;

	
	
	public List<AssistanceRequestDTO> getAssistanteRequestRepository(User user) {
		return assistanteRequestRepository.findByUser(user);
		
	}

	public void setAssistanteRequestRepository(AssistanteRequestRepository assistanteRequestRepository) {
		this.assistanteRequestRepository = assistanteRequestRepository;
	}

	public List<AssistanceRequestDTO> findAll() {
		// TODO Auto-generated method stub
		return assistanteRequestRepository.findAll();
	}

	public Optional<AssistanceRequestDTO> findById(Long id) {
		// TODO Auto-generated method stub
		return assistanteRequestRepository.findById(id);
	}

	public AssistanceRequestDTO save(AssistanceRequestDTO assistanceReques) {
		// TODO Auto-generated method stub
		return assistanteRequestRepository.save(assistanceReques);
	}

	public void delete(AssistanceRequestDTO assistanceRequestDTO) {
		assistanteRequestRepository.delete(assistanceRequestDTO);	
	}
}
