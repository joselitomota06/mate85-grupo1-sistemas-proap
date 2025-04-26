package br.ufba.proap.sysadminpanel.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

import br.ufba.proap.sysadminpanel.domain.CountryGroup;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CountryGroupDTO {
    private Long id;
    private String groupName;
    private BigDecimal valueUSD;
    private List<String> countries;

    public static CountryGroupDTO fromEntity(CountryGroup entity) {
        if (entity == null)
            return null;

        return new CountryGroupDTO(
                entity.getId(),
                entity.getGroupName(),
                entity.getValueUSD(),
                entity.getCountriesList());
    }
}