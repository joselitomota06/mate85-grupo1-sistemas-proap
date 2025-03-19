package br.ufba.proap.adminpanel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ufba.proap.adminpanel.domain.SystemConfiguration;
import br.ufba.proap.adminpanel.domain.dto.SystemConfigurationDTO;
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
        } else {
            config = configs.get(0);
        }

        // Atualiza apenas os campos não nulos
        if (dto.getQualis() != null) {
            config.setQualisList(dto.getQualis());
        }

        if (dto.getGuiaQualisURL() != null) {
            config.setGuiaQualisURL(dto.getGuiaQualisURL());
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
     * Cria uma configuração padrão
     */
    private SystemConfiguration createDefaultConfiguration() {
        SystemConfiguration config = new SystemConfiguration();
        config.setQualisList(List.of("A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"));
        config.setNumMaxDiarias(5);
        config.setValorDiariaBRL(320.0f);
        config.setTextoAvisoQualis("Consulte a classificação Qualis do evento antes de submeter uma solicitação.");
        config.setTextoAvisoValorInscricao(
                "Informe o valor da inscrição em reais ou em dólar, de acordo com o evento.");
        config.setTextoInformacaoQtdDiarias("O número máximo de diárias permitido é de 5 diárias.");

        return repository.save(config);
    }
}