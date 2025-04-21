package br.ufba.proap.solicitationadminpanel.domain.dto;

import java.math.BigDecimal;

public record BudgetSummaryDTO(
        Integer year,
        BigDecimal totalBudget,
        BigDecimal usedBudget,
        BigDecimal remainingBudget) {
}