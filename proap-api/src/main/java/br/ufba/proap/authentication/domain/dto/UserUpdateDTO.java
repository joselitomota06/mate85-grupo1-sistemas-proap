package br.ufba.proap.authentication.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDTO {

    private String name;
    private String registrationNumber;
    private String phone;
    private String alternativePhone;

}
