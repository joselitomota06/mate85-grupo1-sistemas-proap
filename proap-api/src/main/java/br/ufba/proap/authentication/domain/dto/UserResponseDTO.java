package br.ufba.proap.authentication.domain.dto;

import br.ufba.proap.authentication.domain.User;

public record UserResponseDTO(String name, String email, String cpf, String registration, String phone,
                String alternativePhone, String profileName) {

        public static UserResponseDTO fromUser(User user) {
                return new UserResponseDTO(user.getName(), user.getEmail(), user.getCpf(), user.getRegistration(),
                                user.getPhone(), user.getAlternativePhone(), user.getPerfil().getName());
        }
}
