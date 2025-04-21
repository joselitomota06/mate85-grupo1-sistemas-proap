package br.ufba.proap.solicitationadminpanel.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class DateRangeDTO {

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate startDate;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate endDate;

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}