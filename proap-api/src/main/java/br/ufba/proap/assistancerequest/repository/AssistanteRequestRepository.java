package br.ufba.proap.assistancerequest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ufba.proap.assistancerequest.domain.AssistanceRequestDTO;
import br.ufba.proap.authentication.domain.User;

@Repository
public interface AssistanteRequestRepository extends JpaRepository<AssistanceRequestDTO, Long>{
	
	List<AssistanceRequestDTO>findByUser(User user);
}
