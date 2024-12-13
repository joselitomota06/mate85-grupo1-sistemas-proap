package br.ufba.proap.authentication.domain.dto;

public record UserResponseDTO(String name, String email, String cpf, String registration, String phone,
        String alternativePhone, String profileName) {

}
