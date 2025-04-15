package br.ufba.proap.solicitationadminpanel.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record AssistanceIdValueDTO(Long id, Float value, LocalDate createdAt, LocalDate dataAprovacao,
        String avaliadorProap) {

    public static List<AssistanceIdValueDTO> convertPairsToDTOs(List<Object[]> data) {
        return data.stream()
                .map(objArray -> {
                    Long id = (Long) objArray[0];
                    Float value = (Float) objArray[1];
                    LocalDate createdAt = ((LocalDateTime) objArray[2]).toLocalDate();
                    LocalDate dataAprovacao = (LocalDate) objArray[3];
                    String avaliadorProap = (String) objArray[4];
                    AssistanceIdValueDTO dto = new AssistanceIdValueDTO(id, value, createdAt, dataAprovacao,
                            avaliadorProap);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
