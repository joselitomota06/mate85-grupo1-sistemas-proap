package br.ufba.proap.solicitationadminpanel.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record AssistanceIdValueDTO(Long id, Float value, LocalDate createdAt, LocalDate dataAprovacao) {

    public static List<AssistanceIdValueDTO> convertPairsToDTOs(List<Object[]> data) {
        return data.stream()
                .map(objArray -> {
                    Long id = (Long) objArray[0];
                    Float value = (Float) objArray[1];
                    LocalDate createdAt = ((LocalDateTime) objArray[2]).toLocalDate();
                    LocalDate dataAprovacao = (LocalDate) objArray[3];
                    AssistanceIdValueDTO dto = new AssistanceIdValueDTO(id, value, createdAt, dataAprovacao);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
