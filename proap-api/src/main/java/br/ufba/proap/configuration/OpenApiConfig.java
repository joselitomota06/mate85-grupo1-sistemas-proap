package br.ufba.proap.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;
import br.ufba.proap.configuration.constant.SwaggerConstant;

@OpenAPIDefinition(info = @Info(title = SwaggerConstant.API_TITLE, description = SwaggerConstant.API_DESCRIPTION, version = SwaggerConstant.API_VERSION), security = @SecurityRequirement(name = SwaggerConstant.AUTHORIZATION_HEADER))
@SecurityScheme(name = SwaggerConstant.AUTHORIZATION_HEADER, type = SecuritySchemeType.HTTP, scheme = SwaggerConstant.AUTHORIZATION_SCHEME, bearerFormat = SwaggerConstant.AUTHORIZATION_FORMAT, description = SwaggerConstant.AUTHORIZATION_DESCRIPTION)
@Configuration
public class OpenApiConfig {
        // No explicit bean creation needed for OpenAPI configuration with
        // springdoc-openapi
}