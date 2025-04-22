package br.ufba.proap.authentication.domain.dto;

import java.util.List;

public record ProfileDTO(Long id, String name, List<String> permissions) {
}
