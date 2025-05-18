package br.ufba.proap.authentication.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateUserDTO(@NotBlank @Email String email, @NotBlank String password, @NotBlank String name,
        @NotBlank String cpf, @NotBlank String registration, String phone,
        String alternativePhone) {
}
