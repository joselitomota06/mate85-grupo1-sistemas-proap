package br.ufba.proap.sysadminpanel.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "proap_url_mapper", schema = "proap")
public class UrlMapper {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;
    private String fieldName;
    private String urlTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "system_configuration_id")
    private SystemConfiguration systemConfiguration;
}
