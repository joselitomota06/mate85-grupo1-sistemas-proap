package br.ufba.proap.authentication.controller;

import br.ufba.proap.authentication.domain.Perfil;
import br.ufba.proap.authentication.domain.Permission;
import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.domain.dto.ProfileDTO;
import br.ufba.proap.authentication.service.PerfilService;
import br.ufba.proap.authentication.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProfileControllerTest {

    @Mock
    private PerfilService perfilService;

    @Mock
    private UserService userService;

    @InjectMocks
    private ProfileController profileController;

    private User adminUser;
    private User regularUser;
    private User userWithoutProfile;
    private Perfil adminPerfil;
    private Perfil regularPerfil;
    private Permission adminPermission;

    @BeforeEach
    void setUp() {
        // Setup permissions
        adminPermission = new Permission();
        adminPermission.setId(1L);
        adminPermission.setKey("ADMIN_ROLE");
        adminPermission.setEnabled(true);

        Permission userPermission = new Permission();
        userPermission.setId(2L);
        userPermission.setKey("USER_ROLE");
        userPermission.setEnabled(true);

        // Setup profiles
        adminPerfil = new Perfil();
        adminPerfil.setId(1L);
        adminPerfil.setName("ADMIN");
        adminPerfil.setPermissions(new HashSet<>(Arrays.asList(adminPermission, userPermission)));

        regularPerfil = new Perfil();
        regularPerfil.setId(2L);
        regularPerfil.setName("USER");
        regularPerfil.setPermissions(new HashSet<>(Collections.singletonList(userPermission)));

        // Setup users
        adminUser = new User();
        adminUser.setPerfil(adminPerfil);

        regularUser = new User();
        regularUser.setPerfil(regularPerfil);

        userWithoutProfile = new User();
    }

    @Test
    void getProfileByName_WithValidProfile_ReturnsProfileDTO() {
        // Arrange
        when(userService.getLoggedUser()).thenReturn(regularUser);
        when(perfilService.findByName("USER")).thenReturn(Optional.of(regularPerfil));

        // Act
        ResponseEntity<List<ProfileDTO>> response = profileController.getProfileByName();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());

        ProfileDTO dto = response.getBody().get(0);
        assertEquals(regularPerfil.getId(), dto.id());
        assertEquals(regularPerfil.getName(), dto.name());
        assertEquals(1, dto.permissions().size());
        assertEquals("USER_ROLE", dto.permissions().get(0));
    }

    @Test
    void getProfileByName_WithNullProfile_ReturnsEmptyList() {
        // Arrange
        when(userService.getLoggedUser()).thenReturn(regularUser);
        when(perfilService.findByName("USER")).thenReturn(Optional.empty());

        // Act
        ResponseEntity<List<ProfileDTO>> response = profileController.getProfileByName();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isEmpty());
    }

    @Test
    void getAll_WithAdminUser_ReturnsAllProfiles() {
        // Arrange
        when(userService.getLoggedUser()).thenReturn(adminUser);
        when(perfilService.findAll()).thenReturn(Arrays.asList(adminPerfil, regularPerfil));

        // Act
        ResponseEntity<List<ProfileDTO>> response = profileController.getAll();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        verify(perfilService).findAll();
    }

    @Test
    void getAll_WithRegularUser_ReturnsForbidden() {
        // Arrange
        when(userService.getLoggedUser()).thenReturn(regularUser);

        // Act
        ResponseEntity<List<ProfileDTO>> response = profileController.getAll();

        // Assert
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        verify(perfilService, never()).findAll();
    }

    @Test
    void getAll_WithUserWithoutProfile_ReturnsForbidden() {
        // Arrange
        when(userService.getLoggedUser()).thenReturn(userWithoutProfile);

        // Act
        ResponseEntity<List<ProfileDTO>> response = profileController.getAll();

        // Assert
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        verify(perfilService, never()).findAll();
    }
}