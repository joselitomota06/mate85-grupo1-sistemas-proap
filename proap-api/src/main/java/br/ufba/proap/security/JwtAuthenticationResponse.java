package br.ufba.proap.security;

public class JwtAuthenticationResponse {

	private static final String BEARER = "Bearer";

	private String accessToken;

	public JwtAuthenticationResponse(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public String getTokenType() {
		return BEARER;
	}

}
