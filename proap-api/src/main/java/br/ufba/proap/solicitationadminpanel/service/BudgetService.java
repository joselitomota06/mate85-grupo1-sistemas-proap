package br.ufba.proap.solicitationadminpanel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.assistancerequest.repository.AssistanteRequestRepository;
import br.ufba.proap.solicitationadminpanel.domain.SolicitationAdmin;
import br.ufba.proap.solicitationadminpanel.domain.dto.AssistanceIdValueDTO;
import br.ufba.proap.solicitationadminpanel.repository.SolicitationAdminRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class BudgetService {

    @Autowired
    private SolicitationAdminRepository repository;

    @Autowired
    private AssistanteRequestRepository assistanteRequestRepository;

    public SolicitationAdmin setBudget(BigDecimal budget, Integer year) {
        SolicitationAdmin solicitationAdmin = new SolicitationAdmin();
        solicitationAdmin.setOrcamentoAnual(budget);
        solicitationAdmin.setYear(year);
        return repository.save(solicitationAdmin);
    }

    public List<SolicitationAdmin> getBudgetsByYear(Integer year) {
        return repository.findByYear(year);
    }

    public List<AssistanceIdValueDTO> getTotalApprovedAssistanceRequestsValue(LocalDate startDate, LocalDate endDate) {
        return AssistanceIdValueDTO
                .convertPairsToDTOs(assistanteRequestRepository.findTotalApprovedValueByDateRange(startDate, endDate));
    }

    public BigDecimal getRemainingBudget(Integer year) {
        BigDecimal totalBudget = repository.findByYear(year).stream()
                .map(SolicitationAdmin::getOrcamentoAnual)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Float totalSpentFloat = assistanteRequestRepository.findTotalApprovedValueByYear(year) != null
                ? assistanteRequestRepository.findTotalApprovedValueByYear(year)
                : 0;
        BigDecimal totalSpent = BigDecimal.valueOf(totalSpentFloat);
        return totalBudget.subtract(totalSpent);
    }
}