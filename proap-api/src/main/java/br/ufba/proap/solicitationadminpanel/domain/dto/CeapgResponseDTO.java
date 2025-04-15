package br.ufba.proap.solicitationadminpanel.domain.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public record CeapgResponseDTO(Long id, Float valorAprovado, LocalDate dataAvaliacaoProap, String avaliadorProap,
        Float custoFinalCeapg, String observacoesCeapg, String avaliadorCeapg) {

    public static List<CeapgResponseDTO> convertPairsToDTOs(List<Object[]> data) {
        return data.stream()
                .map(objArray -> {
                    Long id = (Long) objArray[0];
                    Float valorAprovado = (Float) objArray[1];
                    LocalDate dataAvaliacaoProap = (LocalDate) objArray[2];
                    String avaliadorProap = (String) objArray[3];
                    Float custoFinalCeapg = (Float) objArray[4];
                    String observacoesCeapg = (String) objArray[5];
                    String avaliadorCeapg = (String) objArray[6];
                    return new CeapgResponseDTO(id, valorAprovado, dataAvaliacaoProap,
                            avaliadorProap, custoFinalCeapg, observacoesCeapg, avaliadorCeapg);
                })
                .collect(Collectors.toList());
    }
}
