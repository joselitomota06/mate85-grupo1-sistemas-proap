package br.ufba.proap.core.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.core.domain.Solicitation;
import br.ufba.proap.core.repository.SolicitationRepository;

@Service
public class SolicitationService {

	@Autowired
	private SolicitationRepository repository;

	public Solicitation create(Solicitation solicitation) {
		return repository.saveAndFlush(solicitation);
	}

	public Solicitation update(Solicitation solicitation) {
		return repository.save(solicitation);
	}

	public List<Solicitation> findAll() {
		return repository.findAll();
	}

	public Optional<Solicitation> findById(Long id) {
		return repository.findById(id);
	}

	public void remove(Solicitation solicitation) {
		repository.delete(solicitation);
	}

}
