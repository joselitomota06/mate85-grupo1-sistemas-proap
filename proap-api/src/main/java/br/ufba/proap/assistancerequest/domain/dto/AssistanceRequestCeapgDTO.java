package br.ufba.proap.assistancerequest.domain.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class AssistanceRequestCeapgDTO {

    private BigDecimal custoFinalCeapg;
    private String observacoesCeapg;
}