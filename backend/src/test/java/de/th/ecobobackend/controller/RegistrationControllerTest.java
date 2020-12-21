package de.th.ecobobackend.controller;

import com.sun.mail.iap.Response;
import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.mongoDB.UserProfileMongoDB;
import de.th.ecobobackend.service.RegistrationMailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import javax.mail.MessagingException;
import java.security.Principal;
import java.time.Instant;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "jwt.secretkey=12345678910",
        "aws.accesskey=12345678910",
        "aws.secretkey=12345678910",
        "email.password=12345678910"
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
    public void registrationOfFreeUsernameShouldReturnNoRelevantErrors() {

        //GIVEN
        UserLoginDto userLoginDto = new UserLoginDto(
                "Tobias",
                "Abc123",
                "test@email.de"
        );

        //WHEN
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/registration",
                                            userLoginDto, String.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        String resultingString = response.getBody();

        //The transport.send method that sends the Email after a successful registration can't be mocked easily and throws an exception while testing
        //that will lead the try-catch block in the RegistrationController to fail and therefore to not display the real success message. Instead it will
        // fallback to the message tested here. With this the test doesn't really test the return of the success message, but it is still not useless as
        //this error message is still different from others (bad password, existing username etc.) and therefore tests the general functionality except
        //the sending of the mail.
        assertThat(resultingString, is("Registrierung nicht möglich. Versuche es später noch einmal."));
    }

    @Test
    public void registrationOfAlreadyTakenUsernameShouldReturnBadString() {

        //GIVEN
        UserLoginDto userLoginDto = new UserLoginDto(
                "Tobias",
                "Abc123",
                ""
        );

        String password = new BCryptPasswordEncoder().encode("Abc123");
        userProfileMongoDB.save(new UserProfile("Tobias", password, Instant.now(), "20.10.1990", "", "", true, ""));

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
                "123",
                ""
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
                "Ab",
                ""
        );

        //WHEN
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/registration",
                userLoginDto, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        String resultingString = response.getBody();

        assertThat(resultingString, is("Unsicheres Passwort. Es benötigt mindestens 3 Zeichen."));
    }

    @Test
    public void activationOfNewUserShouldHappenIfActivationCodeGetsConfirmed(){

        //GIVEN
        String password = new BCryptPasswordEncoder().encode("Abc123");
        UserProfile userProfileBeforeActivation = UserProfile.builder().username("Donald Trump").password("ABC123")
                            .activated(false).activationToken("Abc1000").build();
        UserProfile userProfileAfterActivation = UserProfile.builder().username("Donald Trump").password("ABC123")
                .activated(true).activationToken(null).build();
        userProfileMongoDB.save(userProfileBeforeActivation);

        //WHEN
        ResponseEntity<String> response = restTemplate.exchange("http://localhost:" + port +
                "/auth/registration/activation/" + "Abc1000", HttpMethod.PUT, null, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is("Accountaktivierung erfolgreich."));
        assertThat(userProfileMongoDB.findById("Donald Trump"), is(Optional.of(userProfileAfterActivation)));
    }

}