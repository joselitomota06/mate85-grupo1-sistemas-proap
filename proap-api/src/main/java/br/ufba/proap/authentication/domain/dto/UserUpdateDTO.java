package br.ufba.proap.authentication.domain.dto;

public record UserUpdateDTO(String name, String registrationNumber, String phone,
        String alternativePhone) {

}
