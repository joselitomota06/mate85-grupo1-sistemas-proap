package br.ufba.proap.solicitationadminpanel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.assistancerequest.repository.AssistanceRequestRepository;
import br.ufba.proap.solicitationadminpanel.domain.dto.CeapgResponseDTO;
import jakarta.ws.rs.NotFoundException;

import java.time.LocalDate;
import java.util.List;

@Service
public class CeapgService {

    @Autowired
    private AssistanceRequestRepository assistanceRequestRepository;

    public List<CeapgResponseDTO> getCeapgRequests(LocalDate startDate, LocalDate endDate) {
        List<Object[]> data = assistanceRequestRepository.findAllCeapgRequests(startDate, endDate);
        if (data.isEmpty())
            throw new NotFoundException("Nenhuma solicitação apta para avaliação pelo CEAPG encontrada");
        return CeapgResponseDTO.convertPairsToDTOs(data);
    }

    public List<CeapgResponseDTO> getPendingCeapgRequests(LocalDate startDate, LocalDate endDate) {
        List<Object[]> data = assistanceRequestRepository.findAllPendingCeapgRequests(startDate, endDate);
        if (data.isEmpty())
            throw new NotFoundException("Nenhuma solicitação pendente de avaliação pelo CEAPG encontrada");
        return CeapgResponseDTO.convertPairsToDTOs(data);
    }

    public List<CeapgResponseDTO> getCompletedCeapgRequests(LocalDate startDate, LocalDate endDate) {
        List<Object[]> data = assistanceRequestRepository.findAllCompletedCeapgRequests(startDate, endDate);
        if (data.isEmpty())
            throw new NotFoundException("Nenhuma solicitação avaliada pelo CEAPG encontrada");
        return CeapgResponseDTO.convertPairsToDTOs(data);
    }

}
