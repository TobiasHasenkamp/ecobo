package de.th.ecobobackend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "jwt.secretkey=12345678910",
		"aws.accesskey=12345678910",
		"aws.secretkey=12345678910"
})
class EcoboBackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
