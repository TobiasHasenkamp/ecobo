package de.th.ecobobackend.controller;
import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.mongoDB.NewsfeedMongoDB;
import de.th.ecobobackend.mongoDB.UserProfileMongoDB;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
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
class UserDataControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private NewsfeedMongoDB newsfeedMongoDB;

    @Autowired
    private UserProfileMongoDB userProfileMongoDB;

    @BeforeEach
    public void setupDB() {

        String password = new BCryptPasswordEncoder().encode("Abc123");

        UserProfile user1 = UserProfile.builder()
                .username("Angela Merkel")
                .password(password)
                .registrationDateExternal("05.12.2020")
                .registrationDateInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .build();

        UserProfile user2 = UserProfile.builder()
                .username("Donald Trump")
                .password(password)
                .registrationDateExternal("04.12.2020")
                .registrationDateInternal(Instant.parse("2020-12-04T10:00:00.00Z"))
                .build();

        userProfileMongoDB.deleteAll();
        userProfileMongoDB.save(user1);
        userProfileMongoDB.save(user2);

    }


    private String loginAsUser1(){

        UserLoginDto userLoginDto = new UserLoginDto(
                "Angela Merkel",
                "Abc123"
        );

        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/login",
                userLoginDto, String.class);

        return response.getBody();
    }

    private String loginAsUser2(){

        UserLoginDto userLoginDto = new UserLoginDto(
                "Donald Trump",
                "Abc123"
        );

        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/login",
                userLoginDto, String.class);

        return response.getBody();
    }

    private <T> HttpEntity<T> getValidAuthorizationEntity(T data, String user) {
        if (user.equals("Angela Merkel")){
            String token = loginAsUser1();
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(token);
            return new HttpEntity<T>(data,headers);
        }
        else {
            String token = loginAsUser2();
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(token);
            return new HttpEntity<T>(data,headers);
        }
    }

    private <T> HttpEntity<T> getInvalidAuthorizationEntity(T data) {
        String token = "invalidToken";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        return new HttpEntity<T>(data,headers);
    }

    @Test
    public void testGetUserdataUser1() {
        //Given
        UserProfile user1 = UserProfile.builder()
                .username("Angela Merkel")
                .password("")
                //the password should obviously not get send to the frontend, therefore it is just an empty string
                .registrationDateExternal("05.12.2020")
                .registrationDateInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .build();

        //When
        HttpEntity<Void> entity = getValidAuthorizationEntity(null, "Angela Merkel");
        ResponseEntity<UserProfile> response = restTemplate.exchange("http://localhost:" + port + "/acc/userdata/Angela Merkel", HttpMethod.GET,
                entity, UserProfile.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(user1));

    }

    @Test
    public void testGetUserdataUser2() {
        //Given
        UserProfile user1 = UserProfile.builder()
                .username("Donald Trump")
                .password("")
                //the password should obviously not get send to the frontend, therefore it is just an empty string
                .registrationDateExternal("04.12.2020")
                .registrationDateInternal(Instant.parse("2020-12-04T10:00:00.00Z"))
                .build();

        //When
        HttpEntity<Void> entity = getValidAuthorizationEntity(null, "Donald Trump");
        ResponseEntity<UserProfile> response = restTemplate.exchange("http://localhost:" + port + "/acc/userdata/Donald Trump", HttpMethod.GET,
                entity, UserProfile.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(user1));

    }


    @Test
    public void testGetUserdataShouldThrowWithBadLogin() {
        //When
        HttpEntity<Void> entity = getInvalidAuthorizationEntity(null);
        ResponseEntity<UserProfile> response = restTemplate.exchange("http://localhost:" + port + "/acc/userdata/Donald Trump", HttpMethod.GET,
                entity, UserProfile.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

    @Test
    public void testGetUserdataUserShouldThrowWithValidLoginButWrongUser() {
        //When
        HttpEntity<Void> entity = getValidAuthorizationEntity(null, "Donald Trump");
        ResponseEntity<UserProfile> response = restTemplate.exchange("http://localhost:" + port + "/acc/userdata/Angela Merkel", HttpMethod.GET,
                entity, UserProfile.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

}