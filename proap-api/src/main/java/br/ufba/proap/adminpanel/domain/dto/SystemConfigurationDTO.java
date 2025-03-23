package br.ufba.proap.adminpanel.domain.dto;

import java.util.ArrayList;
import java.util.List;

import br.ufba.proap.adminpanel.domain.SystemConfiguration;
import br.ufba.proap.adminpanel.domain.UrlMapper;
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
    private String sitePgcompURL;
    private String resolucaoProapURL;
    private Integer numMaxDiarias;
    private Float valorDiariaBRL;
    private String textoAvisoQualis;
    private String textoAvisoValorInscricao;
    private String textoInformacaoQtdDiarias;
    private String textoAvisoEnvioArquivoCarta;
    private String textoInformacaoCalcularQualis;
    private String textoInformacaoValorDiaria;
    private String textoInformacaoValorPassagem;
    private List<UrlMapperDTO> resourceLinks;

    public static SystemConfigurationDTO fromEntity(SystemConfiguration config) {
        if (config == null) {
            return null;
        }

        List<UrlMapperDTO> resourceLinksDTO = new ArrayList<>();
        if (config.getResourceLinks() != null) {
            for (UrlMapper urlMapper : config.getResourceLinks()) {
                resourceLinksDTO.add(new UrlMapperDTO(
                        urlMapper.getId(),
                        urlMapper.getUrl(),
                        urlMapper.getFieldName(),
                        urlMapper.getUrlTitle()));
            }
        }

        return new SystemConfigurationDTO(
                config.getId(),
                config.getQualisList(),
                config.getSitePgcompURL(),
                config.getResolucaoProapURL(),
                config.getNumMaxDiarias(),
                config.getValorDiariaBRL(),
                config.getTextoAvisoQualis(),
                config.getTextoAvisoValorInscricao(),
                config.getTextoInformacaoQtdDiarias(),
                config.getTextoAvisoEnvioArquivoCarta(),
                config.getTextoInformacaoCalcularQualis(),
                config.getTextoInformacaoValorDiaria(),
                config.getTextoInformacaoValorPassagem(),
                resourceLinksDTO);
    }

    public SystemConfiguration toEntity() {
        SystemConfiguration config = new SystemConfiguration();
        config.setId(this.id);
        config.setQualisList(this.qualis);
        config.setSitePgcompURL(this.sitePgcompURL);
        config.setResolucaoProapURL(this.resolucaoProapURL);
        config.setNumMaxDiarias(this.numMaxDiarias);
        config.setValorDiariaBRL(this.valorDiariaBRL);
        config.setTextoAvisoQualis(this.textoAvisoQualis);
        config.setTextoAvisoValorInscricao(this.textoAvisoValorInscricao);
        config.setTextoInformacaoQtdDiarias(this.textoInformacaoQtdDiarias);
        config.setTextoAvisoEnvioArquivoCarta(this.textoAvisoEnvioArquivoCarta);
        config.setTextoInformacaoCalcularQualis(this.textoInformacaoCalcularQualis);
        config.setTextoInformacaoValorDiaria(this.textoInformacaoValorDiaria);
        config.setTextoInformacaoValorPassagem(this.textoInformacaoValorPassagem);
        if (this.resourceLinks != null) {
            List<UrlMapper> urlMappers = new ArrayList<>();
            for (UrlMapperDTO dto : this.resourceLinks) {
                UrlMapper urlMapper = new UrlMapper();
                urlMapper.setId(dto.getId());
                urlMapper.setUrl(dto.getUrl());
                urlMapper.setFieldName(dto.getFieldName());
                urlMapper.setUrlTitle(dto.getUrlTitle());
                urlMapper.setSystemConfiguration(config);
                urlMappers.add(urlMapper);
            }
            config.setResourceLinks(urlMappers);
        }

        return config;
    }
}