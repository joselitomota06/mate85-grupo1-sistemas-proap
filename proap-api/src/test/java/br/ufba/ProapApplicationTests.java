package br.ufba;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = ProapApplication.class)
class ProapApplicationTests {

	@Test
	void main() {
		ProapApplication.main(new String[] {});
	}

}
