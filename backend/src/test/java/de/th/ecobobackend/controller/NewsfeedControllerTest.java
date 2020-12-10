package de.th.ecobobackend.controller;
import de.th.ecobobackend.model.NewsfeedElement;
import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.model.enums.NewsfeedType;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "jwt.secretkey=12345678910"
})
class NewsfeedControllerTest {

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

        NewsfeedElement newsfeedElement1 = NewsfeedElement.builder().type(NewsfeedType.ECOELEMENT_ADDED)
                .linkedElement("1001").id("1001").message("Bioladen ist neu.").build();
        NewsfeedElement newsfeedElement2 = NewsfeedElement.builder().type(NewsfeedType.ECOELEMENT_DELETED)
                .linkedElement("1003").id("1002").message("Biokaufhaus wurde gelöscht.").build();
        NewsfeedElement newsfeedElement3 = NewsfeedElement.builder().type(NewsfeedType.USER_REGISTRATION)
                .linkedElement("Testuser").id("1003").message("Willkommen Testuser!").build();

        newsfeedMongoDB.deleteAll();
        newsfeedMongoDB.saveAll(List.of(newsfeedElement1, newsfeedElement2, newsfeedElement3));

        userProfileMongoDB.deleteAll();
        String password = new BCryptPasswordEncoder().encode("Abc123");

        userProfileMongoDB.save(new UserProfile("Tobias", password,
                Instant.now(), "20.10.2020", ""));
        userProfileMongoDB.save(new UserProfile("Donald Trump", password,
                Instant.now(), "20.10.2020", ""));
        userProfileMongoDB.save(new UserProfile("Angela Merkel", password,
                Instant.now(), "20.10.2020", ""));

    }


    private String login(){

        UserLoginDto userLoginDto = new UserLoginDto(
                "Tobias",
                "Abc123"
        );

        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/login",
                userLoginDto, String.class);

        return response.getBody();
    }

    private <T> HttpEntity<T> getValidAuthorizationEntity(T data) {
        String token = login();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        return new HttpEntity<T>(data,headers);
    }

    @Test
    public void testGetNewsfeed() {
        //Given
        NewsfeedElement newsfeedElement1 = NewsfeedElement.builder().type(NewsfeedType.ECOELEMENT_ADDED)
                .linkedElement("1001").id("1001").message("Bioladen ist neu.").build();
        NewsfeedElement newsfeedElement2 = NewsfeedElement.builder().type(NewsfeedType.ECOELEMENT_DELETED)
                .linkedElement("1003").id("1002").message("Biokaufhaus wurde gelöscht.").build();
        NewsfeedElement newsfeedElement3 = NewsfeedElement.builder().type(NewsfeedType.USER_REGISTRATION)
                .linkedElement("Testuser").id("1003").message("Willkommen Testuser!").build();
        List<NewsfeedElement>newsfeedList = new ArrayList<>(List.of(newsfeedElement1,
                newsfeedElement2, newsfeedElement3));

        //When
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<NewsfeedElement[]> response = restTemplate.exchange("http://localhost:" + port + "/api/newsfeed", HttpMethod.GET,
                entity, NewsfeedElement[].class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(newsfeedList.toArray()));

    }

    @Test
    public void testGetNewsfeedElements2() {
        //Given
        NewsfeedElement newsfeedElement3 = NewsfeedElement.builder().type(NewsfeedType.USER_REGISTRATION)
                .linkedElement("Testuser").id("1003").message("Willkommen Testuser!").build();

        //When
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<NewsfeedElement[]> response = restTemplate.exchange("http://localhost:" + port + "/api/newsfeed/2", HttpMethod.GET,
                entity, NewsfeedElement[].class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().length, is(2));
        assertThat(Arrays.stream(response.getBody()).findFirst(), is(Optional.of(newsfeedElement3)));

    }

}