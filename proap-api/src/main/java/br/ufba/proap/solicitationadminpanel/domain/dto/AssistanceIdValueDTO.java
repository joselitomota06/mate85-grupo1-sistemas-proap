package br.ufba.proap.solicitationadminpanel.domain.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record AssistanceIdValueDTO(Long id, BigDecimal value, LocalDate createdAt, LocalDate dataAvaliacaoProap,
        String avaliadorProap) {

    public static List<AssistanceIdValueDTO> convertPairsToDTOs(List<Object[]> data) {
        return data.stream()
                .map(objArray -> {
                    Long id = (Long) objArray[0];
                    BigDecimal value = (BigDecimal) objArray[1];
                    LocalDate createdAt = ((LocalDateTime) objArray[2]).toLocalDate();
                    LocalDate dataAvaliacaoProap = (LocalDate) objArray[3];
                    String avaliadorProap = (String) objArray[4];
                    AssistanceIdValueDTO dto = new AssistanceIdValueDTO(id, value, createdAt, dataAvaliacaoProap,
                            avaliadorProap);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
