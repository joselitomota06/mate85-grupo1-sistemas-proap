package br.ufba.proap.solicitationadminpanel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.ufba.proap.solicitationadminpanel.domain.SolicitationAdmin;
import br.ufba.proap.solicitationadminpanel.service.BudgetService;
import br.ufba.proap.solicitationadminpanel.domain.dto.AssistanceIdValueDTO;
import br.ufba.proap.solicitationadminpanel.domain.dto.DateRangeDTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/admin/budget")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping("/set")
    public ResponseEntity<SolicitationAdmin> setBudget(@RequestParam BigDecimal budget, @RequestParam Integer year) {
        SolicitationAdmin solicitationAdmin = budgetService.setBudget(budget, year);
        return ResponseEntity.ok(solicitationAdmin);
    }

    @GetMapping("/view/{year}")
    public ResponseEntity<List<SolicitationAdmin>> viewBudgets(@PathVariable Integer year) {
        List<SolicitationAdmin> budgets = budgetService.getBudgetsByYear(year);
        return ResponseEntity.ok(budgets);
    }

    @GetMapping("/total-assistance-requests")
    public ResponseEntity<List<AssistanceIdValueDTO>> getTotalAssistanceRequestsValue(
            @RequestBody DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();
        List<AssistanceIdValueDTO> totalValue = budgetService.getTotalApprovedAssistanceRequestsValue(startDate,
                endDate);
        return ResponseEntity.ok(totalValue);
    }

    @GetMapping("/remaining-budget/{year}")
    public ResponseEntity<BigDecimal> getRemainingBudget(@PathVariable Integer year) {
        BigDecimal remainingBudget = budgetService.getRemainingBudget(year);
        return ResponseEntity.ok(remainingBudget);
    }
}
