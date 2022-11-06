package br.ufba.proap.assistancerequest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ufba.proap.assistancerequest.domain.ExtraRequest;
import br.ufba.proap.authentication.domain.User;

@Repository
public interface ExtraRequestRepostirory extends JpaRepository<ExtraRequest, Long> {
	List<ExtraRequest> findByUser(User user);
}
