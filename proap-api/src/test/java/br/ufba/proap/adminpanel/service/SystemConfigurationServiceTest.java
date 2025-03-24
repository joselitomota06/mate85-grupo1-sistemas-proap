package br.ufba.proap.adminpanel.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import br.ufba.proap.adminpanel.domain.SystemConfiguration;
import br.ufba.proap.adminpanel.domain.dto.SystemConfigurationDTO;
import br.ufba.proap.adminpanel.repository.SystemConfigurationRepository;

@ExtendWith(MockitoExtension.class)
public class SystemConfigurationServiceTest {

    @Mock
    private SystemConfigurationRepository repository;

    @InjectMocks
    private SystemConfigurationService service;

    private SystemConfiguration sampleConfig;

    @BeforeEach
    public void setup() {
        // Configuração de exemplo
        sampleConfig = new SystemConfiguration();
        sampleConfig.setId(1L);
        sampleConfig.setQualisList(Arrays.asList("A1", "A2", "B1"));
        sampleConfig.setNumMaxDiarias(5);
        sampleConfig.setValorDiariaBRL(320.0f);
        sampleConfig.setSitePgcompURL("http://example.com/guia-qualis");
        sampleConfig.setResolucaoProapURL("http://example.com/resolucao-proap");
        sampleConfig.setTextoAvisoQualis("Aviso sobre Qualis");
        sampleConfig.setTextoAvisoValorInscricao("Aviso sobre inscrição");
        sampleConfig.setTextoInformacaoQtdDiarias("Informação sobre diárias");
    }

    @Test
    public void testGetCurrentConfiguration_Exists() {
        // Given
        when(repository.findAll()).thenReturn(List.of(sampleConfig));

        // When
        SystemConfigurationDTO result = service.getCurrentConfiguration();

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(Arrays.asList("A1", "A2", "B1"), result.getQualis());
        assertEquals(5, result.getNumMaxDiarias());
        assertEquals(320.0f, result.getValorDiariaBRL());
    }

    @Test
    public void testGetCurrentConfiguration_NotExists() {
        // Given
        when(repository.findAll()).thenReturn(Collections.emptyList());
        when(repository.save(any(SystemConfiguration.class))).thenAnswer(invocation -> {
            SystemConfiguration savedConfig = invocation.getArgument(0);
            savedConfig.setId(1L);
            return savedConfig;
        });

        // When
        SystemConfigurationDTO result = service.getCurrentConfiguration();

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertNotNull(result.getQualis());
        assertNotNull(result.getNumMaxDiarias());
        assertNotNull(result.getValorDiariaBRL());
    }

    @Test
    public void testUpdateConfiguration_Exists() {
        // Given
        when(repository.findAll()).thenReturn(List.of(sampleConfig));
        when(repository.save(any(SystemConfiguration.class))).thenReturn(sampleConfig);

        SystemConfigurationDTO updateDTO = new SystemConfigurationDTO();
        updateDTO.setNumMaxDiarias(7);
        updateDTO.setValorDiariaBRL(400.0f);

        // When
        SystemConfigurationDTO result = service.updateConfiguration(updateDTO);

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(Arrays.asList("A1", "A2", "B1"), result.getQualis());
    }

    @Test
    public void testUpdateConfiguration_NotExists() {
        // Given
        when(repository.findAll()).thenReturn(Collections.emptyList());
        when(repository.save(any(SystemConfiguration.class))).thenAnswer(invocation -> {
            SystemConfiguration savedConfig = invocation.getArgument(0);
            savedConfig.setId(1L);
            return savedConfig;
        });

        SystemConfigurationDTO updateDTO = new SystemConfigurationDTO();
        updateDTO.setNumMaxDiarias(7);
        updateDTO.setValorDiariaBRL(400.0f);

        // When
        SystemConfigurationDTO result = service.updateConfiguration(updateDTO);

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(7, result.getNumMaxDiarias());
        assertEquals(400.0f, result.getValorDiariaBRL());
    }

    @Test
    public void testUpdateQualisList() {
        // Given
        when(repository.findAll()).thenReturn(List.of(sampleConfig));

        List<String> newQualisList = Arrays.asList("A1", "A2", "A3", "A4", "B1");

        // Configurando comportamento do repository.save
        when(repository.save(any(SystemConfiguration.class))).thenAnswer(invocation -> {
            SystemConfiguration savedConfig = invocation.getArgument(0);
            savedConfig.setQualisList(newQualisList);
            return savedConfig;
        });

        // When
        List<String> result = service.updateQualisList(newQualisList);

        // Then
        assertNotNull(result);
        assertEquals(newQualisList, result);
    }
}