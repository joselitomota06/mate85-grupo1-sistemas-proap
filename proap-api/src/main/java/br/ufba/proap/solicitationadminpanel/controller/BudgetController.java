package br.ufba.proap.solicitationadminpanel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.ufba.proap.solicitationadminpanel.domain.SolicitationAdmin;
import br.ufba.proap.solicitationadminpanel.service.BudgetService;
import br.ufba.proap.solicitationadminpanel.domain.dto.AssistanceIdValueDTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        LocalDate start = LocalDate.of(2000, 1, 1);
        LocalDate end = LocalDate.now();

        if (startDate != null) {
            start = LocalDate.parse(startDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        }

        if (endDate != null) {
            end = LocalDate.parse(endDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        }

        List<AssistanceIdValueDTO> totalValue = budgetService.getTotalApprovedAssistanceRequestsValue(start, end);
        return ResponseEntity.ok(totalValue);
    }

    @GetMapping("/remaining-budget/{year}")
    public ResponseEntity<BigDecimal> getRemainingBudget(@PathVariable Integer year) {
        BigDecimal remainingBudget = budgetService.getRemainingBudget(year);
        return ResponseEntity.ok(remainingBudget);
    }
}
