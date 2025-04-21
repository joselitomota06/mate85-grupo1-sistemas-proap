package br.ufba.proap.sysadminpanel.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UrlMapperDTO {
    private Long id;
    private String url;
    private String fieldName;
    private String urlTitle;
}