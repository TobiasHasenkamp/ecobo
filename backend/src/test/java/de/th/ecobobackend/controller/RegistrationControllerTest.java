package de.th.ecobobackend.controller;

import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.mongoDB.UserProfileMongoDB;
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

import java.time.Instant;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "jwt.secretkey=12345678910",
        "aws.accesskey=12345678910",
        "aws.secretkey=12345678910"
})
class RegistrationControllerTest {

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
    }

    @Test
    public void registrationOfFreeUsernameShouldReturnSuccessString() {

        //GIVEN
        UserLoginDto userLoginDto = new UserLoginDto(
                "Tobias",
                "Abc123"
        );

        //WHEN
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/registration",
                                            userLoginDto, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        String resultingString = response.getBody();

        assertThat(resultingString, is("Registrierung erfolgreich."));
    }

    @Test
    public void registrationOfAlreadyTakenUsernameShouldReturnBadString() {

        //GIVEN
        UserLoginDto userLoginDto = new UserLoginDto(
                "Tobias",
                "Abc123"
        );

        String password = new BCryptPasswordEncoder().encode("Abc123");
        userProfileMongoDB.save(new UserProfile("Tobias", password, Instant.now(), "20.10.1990", ""));

        //WHEN
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/registration",
                userLoginDto, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        String resultingString = response.getBody();

        assertThat(resultingString, is("Username existiert bereits. Versuche es mit einem anderen Namen."));
    }

    @Test
    public void registrationOfBadPasswordShouldReturnBadString1() {

        //GIVEN
        UserLoginDto userLoginDto = new UserLoginDto(
                "Tobias",
                "123"
        );

        //WHEN
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/registration",
                userLoginDto, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        String resultingString = response.getBody();

        assertThat(resultingString, is("Unsicheres Passwort. Es benötigt mindestens einen Kleinbuchstaben."));
    }

    @Test
    public void registrationOfBadPasswordShouldReturnBadString2() {

        //GIVEN
        UserLoginDto userLoginDto = new UserLoginDto(
                "Tobias",
                "Ab"
        );

        //WHEN
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/registration",
                userLoginDto, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        String resultingString = response.getBody();

        assertThat(resultingString, is("Unsicheres Passwort. Es benötigt mindestens 3 Zeichen."));
    }

}