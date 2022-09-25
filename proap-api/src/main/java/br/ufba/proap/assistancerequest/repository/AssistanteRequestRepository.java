package br.ufba.proap.assistancerequest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ufba.proap.assistancerequest.dto.AssistanceRequestDTO;

@Repository
public interface AssistanteRequestRepository extends JpaRepository<AssistanceRequestDTO, Long>{

}
