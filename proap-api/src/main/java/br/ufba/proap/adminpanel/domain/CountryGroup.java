package br.ufba.proap.adminpanel.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "proap_country_group", schema = "proap")
public class CountryGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String groupName;

    private Float valueUSD;

    @Column(columnDefinition = "text")
    private String countries;

    @ManyToOne
    @JoinColumn(name = "system_configuration_id")
    private SystemConfiguration systemConfiguration;

    public List<String> getCountriesList() {
        if (countries == null || countries.isEmpty()) {
            return List.of();
        }
        return List.of(countries.split(","));
    }

    public void setCountriesList(List<String> countriesList) {
        if (countriesList == null || countriesList.isEmpty()) {
            this.countries = "";
        } else {
            this.countries = String.join(",", countriesList);
        }
    }
}