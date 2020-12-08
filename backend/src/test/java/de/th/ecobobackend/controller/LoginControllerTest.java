package de.th.ecobobackend.controller;

import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.mongoDB.UserProfileMongoDB;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import java.util.Date;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import java.time.Instant;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "jwt.secretkey=12345678910"
})
class LoginControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserProfileMongoDB userProfileMongoDB;

    private final String secretKey = "12345678910";

    @BeforeEach
    public void setupUsers() {
        userProfileMongoDB.deleteAll();
        String password = new BCryptPasswordEncoder().encode("Abc123");
        userProfileMongoDB.save(new UserProfile("Wladimir Putin", password,
                        Instant.now(), "20.10.2020"));
        userProfileMongoDB.save(new UserProfile("Donald Trump", password,
                Instant.now(), "20.10.2020"));
        userProfileMongoDB.save(new UserProfile("Angela Merkel", password,
                Instant.now(), "20.10.2020"));

    }

    @Test
    public void loginWithCorrectCredentialsShouldReturnJwtToken() {

        //GIVEN
        UserLoginDto userLoginDto = new UserLoginDto(
                "Angela Merkel",
                "Abc123"
        );

        //WHEN
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/login",
                userLoginDto, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        String token = response.getBody();
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();

        assertThat(claims.getSubject(), is("Angela Merkel"));
        assertThat(claims.getExpiration().after(new Date()), is(true));

    }

    @Test
    public void loginWithBadCredentialsShouldReturnForbidden() {

        //GIVEN
        UserLoginDto userLoginDto = new UserLoginDto(
                "Pope Franziskus",
                "Abc123"
        );

        //WHEN
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/login",
                userLoginDto, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));

    }

}