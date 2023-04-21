package br.ufba.proap.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Collections;
import java.util.List;

import static br.ufba.proap.configuration.constant.SwaggerConstant.*;

@Configuration
public class SwaggerConfiguration {
	@Bean
	public Docket ProapApi() {
		return new Docket(DocumentationType.SWAGGER_2)
			.apiInfo(apiInfo())
			.securityContexts(Collections.singletonList(securityContext()))
			.securitySchemes(Collections.singletonList(apiKey()))
			.select()
			.apis(RequestHandlerSelectors.basePackage("br.ufba"))
			.paths(PathSelectors.ant("/**"))
			.build();
			//.ignoredParameterTypes(User.class);
	}

	private ApiInfo apiInfo() {
		return new ApiInfo(
				API_TITLE,
				API_DESCRIPTION,
				"",
				"",
				null,
				"",
				"",
				Collections.emptyList()
		);
	}

	private ApiKey apiKey() {
		return new ApiKey(SECURITY_REFERENCE, AUTHORIZATION, "header");
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder().securityReferences(securityReferences()).build();
	}

	private List<SecurityReference> securityReferences() {
		AuthorizationScope[] authorizationScope = {
				new AuthorizationScope(AUTHORIZATION_SCOPE, AUTHORIZATION_DESCRIPTION)
		};

		return Collections.singletonList(
				new SecurityReference(
					SECURITY_REFERENCE,
					authorizationScope
				)
		);
	}
}
