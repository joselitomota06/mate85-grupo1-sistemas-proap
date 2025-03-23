package br.ufba.proap.adminpanel.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ufba.proap.adminpanel.domain.SystemConfiguration;
import br.ufba.proap.adminpanel.domain.UrlMapper;
import br.ufba.proap.adminpanel.domain.dto.SystemConfigurationDTO;
import br.ufba.proap.adminpanel.domain.dto.UrlMapperDTO;
import br.ufba.proap.adminpanel.repository.SystemConfigurationRepository;

@Service
public class SystemConfigurationService {

    @Autowired
    private SystemConfigurationRepository repository;

    /**
     * Busca a configuração atual do sistema. Se não existir, cria uma com valores
     * padrão.
     */
    @Transactional
    public SystemConfigurationDTO getCurrentConfiguration() {
        List<SystemConfiguration> configs = repository.findAll();

        if (configs.isEmpty()) {
            return SystemConfigurationDTO.fromEntity(createDefaultConfiguration());
        }

        return SystemConfigurationDTO.fromEntity(configs.get(0));
    }

    /**
     * Atualiza a configuração do sistema
     */
    @Transactional
    public SystemConfigurationDTO updateConfiguration(SystemConfigurationDTO dto) {
        List<SystemConfiguration> configs = repository.findAll();

        SystemConfiguration config;
        if (configs.isEmpty()) {
            config = new SystemConfiguration();
            config.setResourceLinks(new ArrayList<>());
        } else {
            config = configs.get(0);
            // Inicializa a lista se for nula
            if (config.getResourceLinks() == null) {
                config.setResourceLinks(new ArrayList<>());
            }
        }

        // Atualiza apenas os campos não nulos
        if (dto.getQualis() != null) {
            config.setQualisList(dto.getQualis());
        }

        if (dto.getSitePgcompURL() != null) {
            config.setSitePgcompURL(dto.getSitePgcompURL());
        }

        if (dto.getResolucaoProapURL() != null) {
            config.setResolucaoProapURL(dto.getResolucaoProapURL());
        }

        if (dto.getNumMaxDiarias() != null) {
            config.setNumMaxDiarias(dto.getNumMaxDiarias());
        }

        if (dto.getValorDiariaBRL() != null) {
            config.setValorDiariaBRL(dto.getValorDiariaBRL());
        }

        if (dto.getTextoAvisoQualis() != null) {
            config.setTextoAvisoQualis(dto.getTextoAvisoQualis());
        }

        if (dto.getTextoAvisoValorInscricao() != null) {
            config.setTextoAvisoValorInscricao(dto.getTextoAvisoValorInscricao());
        }

        if (dto.getTextoInformacaoQtdDiarias() != null) {
            config.setTextoInformacaoQtdDiarias(dto.getTextoInformacaoQtdDiarias());
        }

        if (dto.getTextoAvisoEnvioArquivoCarta() != null) {
            config.setTextoAvisoEnvioArquivoCarta(dto.getTextoAvisoEnvioArquivoCarta());
        }

        if (dto.getTextoInformacaoCalcularQualis() != null) {
            config.setTextoInformacaoCalcularQualis(dto.getTextoInformacaoCalcularQualis());
        }

        if (dto.getTextoInformacaoValorDiaria() != null) {
            config.setTextoInformacaoValorDiaria(dto.getTextoInformacaoValorDiaria());
        }

        if (dto.getTextoInformacaoValorPassagem() != null) {
            config.setTextoInformacaoValorPassagem(dto.getTextoInformacaoValorPassagem());
        }

        if (dto.getResourceLinks() != null) {
            // Limpar a lista atual mantendo a mesma referência
            config.getResourceLinks().clear();

            // Adicionar os novos links à coleção existente
            for (UrlMapperDTO urlDto : dto.getResourceLinks()) {
                UrlMapper url = new UrlMapper();
                if (urlDto.getId() != null) {
                    url.setId(urlDto.getId());
                }
                url.setUrl(urlDto.getUrl());
                url.setFieldName(urlDto.getFieldName());
                url.setUrlTitle(urlDto.getUrlTitle());
                url.setSystemConfiguration(config);
                config.getResourceLinks().add(url);
            }
        }

        config = repository.save(config);
        return SystemConfigurationDTO.fromEntity(config);
    }

    /**
     * Atualiza apenas a lista de Qualis
     */
    @Transactional
    public List<String> updateQualisList(List<String> qualisList) {
        SystemConfigurationDTO config = getCurrentConfiguration();
        config.setQualis(qualisList);
        SystemConfigurationDTO updated = updateConfiguration(config);
        return updated.getQualis();
    }

    /**
     * Atualiza os links de recursos
     */
    @Transactional
    public List<UrlMapperDTO> updateResourceLinks(List<UrlMapperDTO> resourceLinks) {
        SystemConfigurationDTO config = getCurrentConfiguration();
        config.setResourceLinks(resourceLinks);
        SystemConfigurationDTO updated = updateConfiguration(config);
        return updated.getResourceLinks();
    }

    /**
     * Cria uma configuração padrão
     */
    private SystemConfiguration createDefaultConfiguration() {
        SystemConfiguration config = new SystemConfiguration();
        config.setQualisList(List.of("A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"));
        config.setNumMaxDiarias(5);
        config.setValorDiariaBRL(320.0f);
        config.setTextoAvisoQualis(
                "Nos casos de artigos aceitos em conferências, o Qualis deve ser atribubído quando o artigo é aceito no evento principal, e não em eventos satélites como workshops, minicursos ou CTDs.");
        config.setTextoAvisoValorInscricao(
                "O PROAP não reembolsa taxa de filiação, a não ser que seja uma opção obrigatória associada à taxa de inscrição.");
        config.setTextoInformacaoQtdDiarias(
                "Conforme a resolução do PROAP, a quantidade de diárias é limitada ao número de dias do evento, e a última diária pode ser 50% do valor. Leia a resolução antes de finalizar.");
        config.setTextoAvisoEnvioArquivoCarta("É obrigatória a carta de aceite para apoio a publicação científica.");
        config.setTextoInformacaoCalcularQualis(
                "Para calcular o Qualis do seu evento, siga as instruções disponíveis no site da PGCOMP.");
        config.setTextoInformacaoValorDiaria(
                "O valor atual da diária no Brasil é R$320. No exterior, indique o valor em USD, conforme a tabela de auxílio diário no exterior mais recente.");
        config.setTextoInformacaoValorPassagem(
                "As passagens serão adquiridas pelo SCDP.");
        config.setResourceLinks(new ArrayList<>());

        return repository.save(config);
    }
}