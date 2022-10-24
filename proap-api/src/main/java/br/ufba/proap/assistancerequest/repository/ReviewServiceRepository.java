package br.ufba.proap.assistancerequest.repository;

import br.ufba.proap.assistancerequest.domain.AssistanceRequestDTO;
import br.ufba.proap.assistancerequest.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewServiceRepository extends JpaRepository<Review, Long> {

    List<Review> findByAssistanceRequestDTO(AssistanceRequestDTO assistanceRequestDTO);
}
