package de.th.ecobobackend.controller;
import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.NewsfeedElement;
import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.model.enums.NewsfeedType;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
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
class EcoElementControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private EcoElementMongoDB ecoElementMongoDB;

    @Autowired
    private UserProfileMongoDB userProfileMongoDB;

    @BeforeEach
    public void setupDB() {

        EcoElement ecoElement1 = EcoElement.builder().name("Bioladen").category(Category.FOODSTORE)
                .categorySub(CategorySub.FOODSTORE_NORMAL).address("Verkehrsstrasse 49").creator("Tobias")
                .certificates(List.of()).id("111").lat(5.0).lon(5.0).reviews(List.of()).adminNote(null)
                .dateCreatedExternal(null).dateLastUpdatedExternal(null).dateCreatedInternal(null)
                .dateLastUpdatedInternal(null).dateReviewedExternal(null).dateReviewedInternal(null).district(null)
                .isInBochum(true).isReviewed(true).isShownOnMap(true).isVisible(true).openingTimes(null)
                .subtitle(null).url("").urlFacebook("").build();

        EcoElement ecoElement2 = EcoElement.builder().name("Biosupermarkt").category(Category.FOODSTORE)
                .categorySub(CategorySub.FOODSTORE_SUPERMARKET).address("Verkehrsstrasse 47").creator("Angela Merkel")
                .certificates(List.of()).id("222").lat(5.0).lon(5.0).reviews(List.of()).adminNote(null)
                .dateCreatedExternal(null).dateLastUpdatedExternal(null).dateCreatedInternal(null)
                .dateLastUpdatedInternal(null).dateReviewedExternal(null).dateReviewedInternal(null).district(null)
                .isInBochum(true).isReviewed(true).isShownOnMap(true).isVisible(true).openingTimes(null)
                .subtitle(null).url("").urlFacebook("").build();

        EcoElement ecoElement3 = EcoElement.builder().name("Testweltladen").category(Category.FAIRSHOP)
                .categorySub(CategorySub.FAIRSHOP_NORMAL).address("Verkehrsstrasse 57").creator("Tobias")
                .certificates(List.of()).id("333").lat(5.0).lon(5.0).reviews(List.of()).adminNote(null)
                .dateCreatedExternal(null).dateLastUpdatedExternal(null).dateCreatedInternal(null)
                .dateLastUpdatedInternal(null).dateReviewedExternal(null).dateReviewedInternal(null).district(null)
                .isInBochum(true).isReviewed(true).isShownOnMap(true).isVisible(true).openingTimes(null)
                .subtitle(null).url("").urlFacebook("").build();

        ecoElementMongoDB.deleteAll();
        ecoElementMongoDB.saveAll(List.of(ecoElement1, ecoElement2, ecoElement3));

        userProfileMongoDB.deleteAll();
        String password = new BCryptPasswordEncoder().encode("Abc123");

        userProfileMongoDB.save(new UserProfile("Tobias", password,
                Instant.now(), "20.10.2020"));
        userProfileMongoDB.save(new UserProfile("Donald Trump", password,
                Instant.now(), "20.10.2020"));
        userProfileMongoDB.save(new UserProfile("Angela Merkel", password,
                Instant.now(), "20.10.2020"));

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
        EcoElement ecoElement1 = EcoElement.builder().name("Bioladen").category(Category.FOODSTORE)
                .categorySub(CategorySub.FOODSTORE_NORMAL).address("Verkehrsstrasse 49").creator("Tobias")
                .certificates(List.of()).id("111").lat(5.0).lon(5.0).reviews(List.of()).adminNote(null)
                .dateCreatedExternal(null).dateLastUpdatedExternal(null).dateCreatedInternal(null)
                .dateLastUpdatedInternal(null).dateReviewedExternal(null).dateReviewedInternal(null).district(null)
                .isInBochum(true).isReviewed(true).isShownOnMap(true).isVisible(true).openingTimes(null)
                .subtitle(null).url("").urlFacebook("").build();

        EcoElement ecoElement2 = EcoElement.builder().name("Biosupermarkt").category(Category.FOODSTORE)
                .categorySub(CategorySub.FOODSTORE_SUPERMARKET).address("Verkehrsstrasse 47").creator("Angela Merkel")
                .certificates(List.of()).id("222").lat(5.0).lon(5.0).reviews(List.of()).adminNote(null)
                .dateCreatedExternal(null).dateLastUpdatedExternal(null).dateCreatedInternal(null)
                .dateLastUpdatedInternal(null).dateReviewedExternal(null).dateReviewedInternal(null).district(null)
                .isInBochum(true).isReviewed(true).isShownOnMap(true).isVisible(true).openingTimes(null)
                .subtitle(null).url("").urlFacebook("").build();

        EcoElement ecoElement3 = EcoElement.builder().name("Testweltladen").category(Category.FAIRSHOP)
                .categorySub(CategorySub.FAIRSHOP_NORMAL).address("Verkehrsstrasse 57").creator("Tobias")
                .certificates(List.of()).id("333").lat(5.0).lon(5.0).reviews(List.of()).adminNote(null)
                .dateCreatedExternal(null).dateLastUpdatedExternal(null).dateCreatedInternal(null)
                .dateLastUpdatedInternal(null).dateReviewedExternal(null).dateReviewedInternal(null).district(null)
                .isInBochum(true).isReviewed(true).isShownOnMap(true).isVisible(true).openingTimes(null)
                .subtitle(null).url("").urlFacebook("").build();

        List<EcoElement> ecoElementList = List.of(ecoElement1, ecoElement2, ecoElement3);

        //When
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<EcoElement[]> response = restTemplate.exchange("http://localhost:" + port + "/api/elements", HttpMethod.GET,
                entity, EcoElement[].class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(ecoElementList.toArray()));

    }



}