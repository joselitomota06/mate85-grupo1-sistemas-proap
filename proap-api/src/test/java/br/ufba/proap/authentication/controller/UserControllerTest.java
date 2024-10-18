package br.ufba.proap.authentication.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import br.ufba.proap.authentication.domain.Perfil;
import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.service.PerfilService;
import br.ufba.proap.authentication.service.UserService;

class UserControllerTest {

	private static final String NAME_PARAM = "Oracio Candido";
	private static final String CPF_PARAM = "99999999999";
	private static final String EMAIL_PARAM = "oracio@corp.com";
	private static final String PASSWORD_PARAM = "123456";
	private static final String REGISTRATION_PARAM = "1111111";
	private static final String PHONE_PARAM = "7133333333";

	@InjectMocks
	private UserController controller;

	@Mock
	private UserService service;

	@Mock
	private PerfilService perfilService;

	private User user;
	private Perfil perfil;
	private Optional<Perfil> optionalPerfil;

	@BeforeEach
	void setUp() throws Exception {
		MockitoAnnotations.openMocks(this);
		startUser();
	}

	@Test
	void whenSetAdminUserThenReturnSucess() {
		Mockito.when(service.getLoggedUser()).thenReturn(user);
		Mockito.when(perfilService.findById(Mockito.anyLong())).thenReturn(optionalPerfil);
		Mockito.when(service.update(Mockito.any())).thenReturn(user);

		ResponseEntity<String> response = controller.setAdminUser(10L);

		assertNotNull(response);
		assertNotNull(response.getBody());
		assertEquals(ResponseEntity.class, response.getClass());
		assertEquals(String.class, response.getBody().getClass());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals("Atulização realizada com sucesso!", response.getBody());
	}

	@Test
	void whenSetAdminUserAndCurrentUserIsNullThenReturnBadRequest() {
		Mockito.when(service.getLoggedUser()).thenReturn(null);
		ResponseEntity<String> response = controller.setAdminUser(10L);
		assertNotNull(response);
		assertEquals(ResponseEntity.class, response.getClass());
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

	@Test
	void whenSetAdminUserAndCurrentUserNotAHavePerfilThenReturnBadRequest() {
		Mockito.when(service.getLoggedUser()).thenReturn(user);

		user.setPerfil(null);
		ResponseEntity<String> response = controller.setAdminUser(10L);
		assertNotNull(response);
		assertEquals(ResponseEntity.class, response.getClass());
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

	@Test
	void whenSetAdminUserAndCurrentUserIsNotAdminThenReturnBadRequest() {
		Mockito.when(service.getLoggedUser()).thenReturn(user);
		user.getPerfil().setAdmin(false);

		ResponseEntity<String> response = controller.setAdminUser(10L);
		assertNotNull(response);
		assertEquals(ResponseEntity.class, response.getClass());
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

	private void startUser() {
		perfil = new Perfil();
		perfil.setAdmin(true);

		user = new User();
		user.setCpf(CPF_PARAM);
		user.setEmail(EMAIL_PARAM);
		user.setName(NAME_PARAM);
		user.setPassword(PASSWORD_PARAM);
		user.setRegistration(REGISTRATION_PARAM);
		user.setPhone(PHONE_PARAM);
		user.setPerfil(perfil);

		optionalPerfil = Optional.of(perfil);
	}
}
