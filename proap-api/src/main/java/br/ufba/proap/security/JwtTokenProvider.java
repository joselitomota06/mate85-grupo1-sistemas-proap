package br.ufba.proap.security;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import br.ufba.proap.authentication.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import br.ufba.proap.security.HashProvider.Algorithm;

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

	private SecretKey getSigningKey() {
		String hashedSecret = HashProvider.hash(jwtSecret, Algorithm.SHA256);
		return Keys.hmacShaKeyFor(hashedSecret.getBytes(StandardCharsets.UTF_8));
	}

	public String generateToken(Authentication authentication) {
		User userPrincipal = (User) authentication.getPrincipal();
		OffsetDateTime expiryDate = OffsetDateTime.now().plus(jwtExpirationInMs, ChronoUnit.MILLIS);
		Map<String, Object> claims = new HashMap<>();

		claims.put("id", userPrincipal.getId());
		claims.put("name", userPrincipal.getName());
		claims.put("email", userPrincipal.getEmail());
		claims.put("profile", userPrincipal.getPerfil().getName());
		claims.put("permissions",
				userPrincipal.getPerfil().getPermissions().stream().map(permission -> permission.getKey()).toList());

		return Jwts.builder()
				.subject(userPrincipal.getName())
				.claims(claims)
				.issuedAt(Date.from(OffsetDateTime.now().toInstant()))
				.expiration(Date.from(expiryDate.toInstant()))
				.signWith(getSigningKey()).compact();
	}

	String getEmailFromJwt(String token) {
		Claims claims = Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload();
		return String.valueOf(claims.get("email"));
	}

	boolean validateToken(String authToken) {
		try {
			Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(authToken);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			e.getMessage();
		}
		return false;
	}

}