package br.ufba.proap.adminpanel.domain.dto;

import java.util.List;

import br.ufba.proap.adminpanel.domain.SystemConfiguration;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SystemConfigurationDTO {

    private Long id;
    private List<String> qualis;
    private String guiaQualisURL;
    private String resolucaoProapURL;
    private Integer numMaxDiarias;
    private Float valorDiariaBRL;
    private String textoAvisoQualis;
    private String textoAvisoValorInscricao;
    private String textoInformacaoQtdDiarias;

    public static SystemConfigurationDTO fromEntity(SystemConfiguration config) {
        if (config == null) {
            return null;
        }

        return new SystemConfigurationDTO(
                config.getId(),
                config.getQualisList(),
                config.getGuiaQualisURL(),
                config.getResolucaoProapURL(),
                config.getNumMaxDiarias(),
                config.getValorDiariaBRL(),
                config.getTextoAvisoQualis(),
                config.getTextoAvisoValorInscricao(),
                config.getTextoInformacaoQtdDiarias());
    }

    public SystemConfiguration toEntity() {
        SystemConfiguration config = new SystemConfiguration();
        config.setId(this.id);
        config.setQualisList(this.qualis);
        config.setGuiaQualisURL(this.guiaQualisURL);
        config.setResolucaoProapURL(this.resolucaoProapURL);
        config.setNumMaxDiarias(this.numMaxDiarias);
        config.setValorDiariaBRL(this.valorDiariaBRL);
        config.setTextoAvisoQualis(this.textoAvisoQualis);
        config.setTextoAvisoValorInscricao(this.textoAvisoValorInscricao);
        config.setTextoInformacaoQtdDiarias(this.textoInformacaoQtdDiarias);

        return config;
    }
}