package br.ufba.proap.assistancerequest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ufba.proap.assistancerequest.domain.AssistanceRequest;
import br.ufba.proap.authentication.domain.User;

@Repository
public interface AssistanteRequestRepository extends JpaRepository<AssistanceRequest, Long> {
	List<AssistanceRequest> findByUser(User user);

	long countByUser(User user);
}
