package br.ufba.proap.security;

import java.sql.Date;
import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import br.ufba.proap.authentication.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.Password;

@Component
public class JwtTokenProvider {

	@Value("${app.jwtSecret}")
	private String jwtSecret;

	@Value("${app.jwtExpirationInMs}")
	private int jwtExpirationInMs;

	/*
	 * @Autowired
	 * private PerfilService perfilService;
	 */

	public String generateToken(Authentication authentication) {
		User userPrincipal = (User) authentication.getPrincipal();
		OffsetDateTime expiryDate = OffsetDateTime.now().plus(jwtExpirationInMs, ChronoUnit.MILLIS);
		Map<String, Object> claims = new HashMap<>();
		Password secretKey = Keys.password(jwtSecret.toCharArray());

		claims.put("id", userPrincipal.getId());
		claims.put("name", userPrincipal.getName());
		claims.put("email", userPrincipal.getEmail());
		claims.put("isAdmin", userPrincipal.getPerfil() != null ? userPrincipal.getPerfil().isAdmin() : false);

		return Jwts.builder()
				.subject(userPrincipal.getName())
				.claims(claims)
				.issuedAt(Date.from(OffsetDateTime.now().toInstant()))
				.expiration(Date.from(expiryDate.toInstant()))
				.signWith(secretKey).compact();
	}

	String getEmailFromJwt(String token) {
		Password secretKey = Keys.password(jwtSecret.toCharArray());
		Claims claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
		return String.valueOf(claims.get("email"));
	}

	boolean validateToken(String authToken) {
		Password secretKey = Keys.password(jwtSecret.toCharArray());
		try {
			Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(authToken);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			e.getMessage();
		}
		return false;
	}

}