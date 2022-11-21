package br.ufba.proap.authentication.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Collection;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.domain.dto.UpdatePasswordDTO;
import br.ufba.proap.authentication.repository.UserRepository;

@SpringBootTest
class UserServiceTest {

	private static final String NAME_PARAM = "Oracio Candido";
	private static final String CPF_PARAM = "99999999999";
	private static final String EMAIL_PARAM = "oracio@corp.com";
	private static final String PASSWORD_PARAM = "123456";
	private static final String PASSWOR_ENCODE_PARAM = "a54sa54";
	private static final String REGISTRATION_PARAM = "1111111";
	private static final String PHONE_PARAM = "7133333333";

	@InjectMocks
	private UserService service;

	@Mock
	private UserRepository repository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@Mock
	private SecurityContext securityContext;

	private User user;
	private Optional<User> optionalUser;
	private Authentication autheticatedUser;

	@BeforeEach
	void setUp() throws Exception {
		MockitoAnnotations.openMocks(this);
		startUser();
		starAuthentication();
	}

	@Test
	void whenLoadUserByUsernameThenReturnAnUsernameNotFoundException() {
		Mockito.when(repository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());

		try {
			service.loadUserByUsername(EMAIL_PARAM);
		} catch (Exception e) {
			assertEquals(UsernameNotFoundException.class, e.getClass());
			assertEquals("Email user: " + EMAIL_PARAM + " not found", e.getMessage());
		}

	}

	@Test
	void whenLoadUserByUsernameThenReturnAnUserInstance() {
		Mockito.when(repository.findByEmail(Mockito.anyString())).thenReturn(optionalUser);
		UserDetails userByUsername = service.loadUserByUsername(EMAIL_PARAM);

		assertNotNull(userByUsername);
		assertEquals(User.class, userByUsername.getClass());
		assertEquals(EMAIL_PARAM, userByUsername.getUsername());
	}
	
	@Test
	void whenGetLoggedUserThenReturnAnUserInstance() {
		Mockito.when(securityContext.getAuthentication()).thenReturn(autheticatedUser);
		Mockito.when(repository.findByEmail(Mockito.anyString())).thenReturn(optionalUser);
		SecurityContextHolder.setContext(securityContext);

		User loggedUser = service.getLoggedUser();
		assertNotNull(loggedUser);
		assertEquals(User.class, loggedUser.getClass());
		assertEquals(EMAIL_PARAM, loggedUser.getUsername());
	}

	@Test
	void whenUpdateCustomerContactsThenReturnAnNotIllegalArgumentException() {
		Mockito.when(repository.findByEmailAndCPF(Mockito.anyString(), Mockito.anyString())).thenReturn(null);

		UpdatePasswordDTO updatePasswordDTO = new UpdatePasswordDTO();
		updatePasswordDTO.setCpf(CPF_PARAM);
		updatePasswordDTO.setEmail(EMAIL_PARAM);
		updatePasswordDTO.setPassword(PASSWORD_PARAM);

		try {
			service.updateCustomerContacts(updatePasswordDTO);
		} catch (Exception e) {
			assertEquals(IllegalArgumentException.class, e.getClass());
			assertEquals("Algum parâmetro informado está incorreto. Favor verificar.", e.getMessage());
		}

	}

	@Test
	void whenUpdateCustomerContactsAndPasswordIsNullThenReturnAnIllegalArgumentException() {
		Mockito.when(repository.findByEmailAndCPF(Mockito.anyString(), Mockito.anyString())).thenReturn(null);

		UpdatePasswordDTO updatePasswordDTO = new UpdatePasswordDTO();
		updatePasswordDTO.setCpf(CPF_PARAM);
		updatePasswordDTO.setEmail(EMAIL_PARAM);
		updatePasswordDTO.setPassword(null);

		try {
			service.updateCustomerContacts(updatePasswordDTO);
		} catch (Exception e) {
			assertEquals(IllegalArgumentException.class, e.getClass());
			assertEquals("Algum parâmetro informado está incorreto. Favor verificar.", e.getMessage());
		}

	}

	@Test
	void whenUpdateCustomerContactsThenReturnAnUserInstance() {
		Mockito.when(repository.findByEmailAndCPF(Mockito.anyString(), Mockito.anyString())).thenReturn(user);
		Mockito.when(passwordEncoder.encode(Mockito.anyString())).thenReturn(PASSWOR_ENCODE_PARAM);
		Mockito.when(repository.save(Mockito.any())).thenReturn(user);

		UpdatePasswordDTO updatePasswordDTO = new UpdatePasswordDTO();
		updatePasswordDTO.setCpf(CPF_PARAM);
		updatePasswordDTO.setEmail(EMAIL_PARAM);
		updatePasswordDTO.setPassword(PASSWORD_PARAM);

		User updateCustomerContacts = service.updateCustomerContacts(updatePasswordDTO);

		assertNotNull(updateCustomerContacts);
		assertEquals(User.class, updateCustomerContacts.getClass());
		assertEquals(EMAIL_PARAM, updateCustomerContacts.getUsername());
		assertEquals(PASSWOR_ENCODE_PARAM, updateCustomerContacts.getPassword());
	}

	private void startUser() {
		user = new User();
		user.setCpf(CPF_PARAM);
		user.setEmail(EMAIL_PARAM);
		user.setName(NAME_PARAM);
		user.setPassword(PASSWORD_PARAM);
		user.setRegistration(REGISTRATION_PARAM);
		user.setPhone(PHONE_PARAM);

		optionalUser = Optional.of(user);
	}

	private void starAuthentication() {
		autheticatedUser = new Authentication() {
			private static final long serialVersionUID = 1L;

			@Override
			public String getName() {
				return user.getName();
			}

			@Override
			public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
				// Empty method
			}
	
			@Override
			public boolean isAuthenticated() {
				return true;
			}

			@Override
			public Object getPrincipal() {
				return user;
			}
			
			@Override
			public Object getDetails() {
				return null;
			}

			@Override
			public Object getCredentials() {
				return null;
			}

			@Override
			public Collection<? extends GrantedAuthority> getAuthorities() {
				return null;
			}
		};
	}
}
