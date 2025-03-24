package br.ufba.proap.adminpanel.domain.dto;

import br.ufba.proap.adminpanel.domain.CountryGroup;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CountryGroupDTO {
    private Long id;
    private String groupName;
    private Float valueUSD;
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