package br.ufba.proap.configuration;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import br.ufba.proap.authentication.service.UserService;
import br.ufba.proap.security.JwtAuthenticationEntryPoint;
import br.ufba.proap.security.JwtAuthenticationFilter;
import jakarta.ws.rs.HttpMethod;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;

	public static final long MAX_AGE_SECS = 3600;

	@Autowired
	JwtAuthenticationFilter jwtAuthenticationFilter;

	@Autowired
	UserService userService;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				// .cors(cors -> cors.disable())
				.csrf(csrf -> csrf.disable())
				.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers(HttpMethod.POST, "/authentication/**", "/user/create", "/actuator/**")
						.permitAll()
						.requestMatchers(HttpMethod.GET, "/profile/**")
						.permitAll()
						.requestMatchers("/v3/api-docs/**", "/configuration/**",
								"/swagger-resources/**",
								"/**.html",
								"/webjars/**",
								"/swagger-ui/**")
						.permitAll()
						.requestMatchers(HttpMethod.GET, "/user/list").hasAuthority("VIEW_USER")
						.anyRequest().authenticated())
				.logout(logout -> logout.logoutUrl("/proap-api/authentication/logout"))
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setMaxAge(MAX_AGE_SECS);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	public UserDetailsService userDetailsService() {
		return userService;
	}

}