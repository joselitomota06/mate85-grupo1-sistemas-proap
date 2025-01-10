package br.ufba.proap.authentication.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordDTO(
        @NotBlank(message = "Campo não pode estar em branco") String currentPassword,
        @NotBlank(message = "Campo não pode estar em branco") @Size(min = 8, message = "A nova senha deve ter pelo menos 8 caracteres") String newPassword) {

}
