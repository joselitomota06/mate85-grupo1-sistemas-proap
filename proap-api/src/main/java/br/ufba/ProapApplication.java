package br.ufba;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ProapApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProapApplication.class, args);
	}

}