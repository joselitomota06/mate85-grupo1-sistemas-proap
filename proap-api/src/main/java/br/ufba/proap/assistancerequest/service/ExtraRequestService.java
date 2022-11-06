package br.ufba.proap.assistancerequest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.assistancerequest.domain.ExtraRequest;
import br.ufba.proap.assistancerequest.repository.ExtraRequestRepostirory;
import br.ufba.proap.authentication.domain.User;

@Service
public class ExtraRequestService {

	@Autowired
	private ExtraRequestRepostirory extraRequestRepostirory;

	public List<ExtraRequest> findAll() {
		return extraRequestRepostirory.findAll();
	}

	public List<ExtraRequest> findByUser(User user) {
		return extraRequestRepostirory.findByUser(user);
	}

	public Optional<ExtraRequest> findById(Long id) {
		return extraRequestRepostirory.findById(id);
	}

	public ExtraRequest save(ExtraRequest extraRequest) {
		return extraRequestRepostirory.save(extraRequest);
	}

	public void delete(ExtraRequest extraRequest) {
		extraRequestRepostirory.delete(extraRequest);	
	}
	
}
