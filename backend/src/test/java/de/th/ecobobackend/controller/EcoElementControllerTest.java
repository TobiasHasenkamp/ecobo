package de.th.ecobobackend.controller;
import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.Review;
import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.dto.ReviewDto;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
import de.th.ecobobackend.mongoDB.UserProfileMongoDB;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import java.time.Instant;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "jwt.secretkey=12345678910",
        "aws.accesskey=12345678910",
        "aws.secretkey=12345678910"
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

    @MockBean
    private TimestampUtils timestampUtils;

    @MockBean
    private IDUtils idUtils;

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


    private <T> HttpEntity<T> getInvalidAuthorizationEntity(T data) {
        String token = "invalidToken";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        return new HttpEntity<T>(data,headers);
    }


    List<EcoElement> returnEcoElementList(){
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

        return List.of(ecoElement1, ecoElement2, ecoElement3);
    }

    EcoElement returnEcoElement111(){
        return EcoElement.builder().name("Bioladen").category(Category.FOODSTORE)
                .categorySub(CategorySub.FOODSTORE_NORMAL).address("Verkehrsstrasse 49").creator("Tobias")
                .certificates(List.of()).id("111").lat(5.0).lon(5.0).reviews(List.of()).adminNote(null)
                .dateCreatedExternal(null).dateLastUpdatedExternal(null).dateCreatedInternal(null)
                .dateLastUpdatedInternal(null).dateReviewedExternal(null).dateReviewedInternal(null).district(null)
                .isInBochum(true).isReviewed(true).isShownOnMap(true).isVisible(true).openingTimes(null)
                .subtitle(null).url("").urlFacebook("").build();
    }

    EcoElement returnEcoElement222(){
        return EcoElement.builder().name("Biosupermarkt").category(Category.FOODSTORE)
                .categorySub(CategorySub.FOODSTORE_SUPERMARKET).address("Verkehrsstrasse 47").creator("Angela Merkel")
                .certificates(List.of()).id("222").lat(5.0).lon(5.0).reviews(List.of()).adminNote(null)
                .dateCreatedExternal(null).dateLastUpdatedExternal(null).dateCreatedInternal(null)
                .dateLastUpdatedInternal(null).dateReviewedExternal(null).dateReviewedInternal(null).district(null)
                .isInBochum(true).isReviewed(true).isShownOnMap(true).isVisible(true).openingTimes(null)
                .subtitle(null).url("").urlFacebook("").build();
    }

    @Test
    public void testGetEcoElements() {
        //When
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<EcoElement[]> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements", HttpMethod.GET,
                entity, EcoElement[].class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(returnEcoElementList().toArray()));
    }

    @Test
    public void testGetEcoElementById1() {
        //When
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<EcoElement> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/111", HttpMethod.GET,
                entity, EcoElement.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(returnEcoElement111()));
    }

    @Test
    public void testGetEcoElementById2() {
        //When
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<EcoElement> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/222", HttpMethod.GET,
                        entity, EcoElement.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(returnEcoElement222()));
    }

    @Test
    public void testPostEcoElementWithValidLogin() {

        //Given
        EcoElementDto newEcoElementDto = new EcoElementDto("Testrestaurant", Category.RESTAURANT,
                CategorySub.RESTAURANT_RESTAURANT, "", "Riemke", "Verkehrsstrasse 17",
                "", "", "", "", true,
                List.of(), 5.0, 5.0, "Tobias");

        EcoElement newEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 17").creator("Tobias")
                .certificates(List.of()).id("12345").lat(5.0).lon(5.0).reviews(List.of()).adminNote("")
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district("Riemke").isInBochum(true).isReviewed(false)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).pictureUrl("").build();


        //When
        when(idUtils.generateID()).thenReturn("12345");
        when(timestampUtils.generateTimeStamp()).thenReturn(Instant.parse("2020-12-05T10:00:00.00Z"));
        when(timestampUtils.generateReadableDateStamp()).thenReturn("05.12.2020");

        HttpEntity<EcoElementDto> entity = getValidAuthorizationEntity(newEcoElementDto);
        ResponseEntity<EcoElement> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected", HttpMethod.POST,
                        entity, EcoElement.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(newEcoElement));
    }

    @Test
    public void testPostEcoElementShouldThrowWithBadLogin() {

        //Given
        EcoElementDto newEcoElementDto = new EcoElementDto("Testrestaurant", Category.RESTAURANT,
                CategorySub.RESTAURANT_RESTAURANT, "", "Riemke", "Verkehrsstrasse 17",
                "", "", "", "", true,
                List.of(), 5.0, 5.0, "Tobias");

        //When
        when(idUtils.generateID()).thenReturn("12345");
        when(timestampUtils.generateTimeStamp()).thenReturn(Instant.parse("2020-12-05T10:00:00.00Z"));
        when(timestampUtils.generateReadableDateStamp()).thenReturn("05.12.2020");

        HttpEntity<EcoElementDto> entity = getInvalidAuthorizationEntity(newEcoElementDto);
        ResponseEntity<String> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected", HttpMethod.POST,
                        entity, String.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

    @Test
    public void testUpdateEcoElementWithValidLoginAndSmallChanges() {

        //Given
        EcoElement existingEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 17").creator("Tobias")
                .certificates(List.of()).id("12345").lat(10.0).lon(10.0).reviews(List.of()).adminNote("")
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district(null).isInBochum(true).isReviewed(false)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();

        ecoElementMongoDB.save(existingEcoElement);

        EcoElementDto newEcoElementDto = new EcoElementDto("Testrestaurant", Category.RESTAURANT,
                CategorySub.RESTAURANT_RESTAURANT, "", "Riemke", "Verkehrsstrasse 17",
                "", "", "", "", true,
                List.of(), 5.0, 5.0, "Tobias");

        EcoElement newEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 17").creator("Tobias")
                .certificates(List.of()).id("12345").lat(5.0).lon(5.0).reviews(List.of()).adminNote("")
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district("Riemke").isInBochum(true).isReviewed(false)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();


        //When
        when(timestampUtils.generateTimeStamp()).thenReturn(Instant.parse("2020-12-05T10:00:00.00Z"));
        when(timestampUtils.generateReadableDateStamp()).thenReturn("05.12.2020");

        HttpEntity<EcoElementDto> entity = getValidAuthorizationEntity(newEcoElementDto);
        ResponseEntity<EcoElement> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected/12345", HttpMethod.PUT,
                        entity, EcoElement.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(newEcoElement));
    }


    @Test
    public void testUpdateEcoElementWithValidLoginAndHugeChangesThatResetTheReviewStatus() {

        //Given
        EcoElement existingEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 10").creator("Tobias")
                .certificates(List.of()).id("12345").lat(10.0).lon(10.0).reviews(List.of()).adminNote("")
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district(null).isInBochum(true).isReviewed(true)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();

        ecoElementMongoDB.save(existingEcoElement);

        EcoElementDto newEcoElementDto = new EcoElementDto("Testrestaurant", Category.RESTAURANT,
                CategorySub.RESTAURANT_RESTAURANT, "", "Riemke", "Verkehrsstrasse 17",
                "", "", "", "", true,
                List.of(), 5.0, 5.0, "Tobias");

        EcoElement newEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 17").creator("Tobias")
                .certificates(List.of()).id("12345").lat(5.0).lon(5.0).reviews(List.of())
                .adminNote("Review has been reseted because of an element edit.")
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal(null)
                .dateReviewedInternal(null).district("Riemke").isInBochum(true).isReviewed(false)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();


        //When
        when(timestampUtils.generateTimeStamp()).thenReturn(Instant.parse("2020-12-05T10:00:00.00Z"));
        when(timestampUtils.generateReadableDateStamp()).thenReturn("05.12.2020");

        HttpEntity<EcoElementDto> entity = getValidAuthorizationEntity(newEcoElementDto);
        ResponseEntity<EcoElement> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected/12345", HttpMethod.PUT,
                        entity, EcoElement.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(newEcoElement));
    }

    @Test
    public void testUpdateEcoElementShouldThrowWithBadLogin() {

        //Given
        EcoElement existingEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 10").creator("Tobias")
                .certificates(List.of()).id("12345").lat(10.0).lon(10.0).reviews(List.of()).adminNote("")
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district(null).isInBochum(true).isReviewed(true)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();

        ecoElementMongoDB.save(existingEcoElement);

        EcoElementDto newEcoElementDto = new EcoElementDto("Testrestaurant", Category.RESTAURANT,
                CategorySub.RESTAURANT_RESTAURANT, "", "Riemke", "Verkehrsstrasse 17",
                "", "", "", "", true,
                List.of(), 5.0, 5.0, "Tobias");

        //When
        when(timestampUtils.generateTimeStamp()).thenReturn(Instant.parse("2020-12-05T10:00:00.00Z"));
        when(timestampUtils.generateReadableDateStamp()).thenReturn("05.12.2020");

        HttpEntity<EcoElementDto> entity = getInvalidAuthorizationEntity(newEcoElementDto);
        ResponseEntity<EcoElement> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected/12345", HttpMethod.PUT,
                        entity, EcoElement.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

    @Test
    public void testUpdateEcoElementShouldThrowWithBadID() {

        //Given
        EcoElement existingEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 10").creator("Tobias")
                .certificates(List.of()).id("12345").lat(10.0).lon(10.0).reviews(List.of()).adminNote("")
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district(null).isInBochum(true).isReviewed(true)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();

        ecoElementMongoDB.save(existingEcoElement);

        EcoElementDto newEcoElementDto = new EcoElementDto("Testrestaurant", Category.RESTAURANT,
                CategorySub.RESTAURANT_RESTAURANT, "", "Riemke", "Verkehrsstrasse 17",
                "", "", "", "", true,
                List.of(), 5.0, 5.0, "Tobias");

        //When
        when(timestampUtils.generateTimeStamp()).thenReturn(Instant.parse("2020-12-05T10:00:00.00Z"));
        when(timestampUtils.generateReadableDateStamp()).thenReturn("05.12.2020");

        HttpEntity<EcoElementDto> entity = getValidAuthorizationEntity(newEcoElementDto);
        ResponseEntity<EcoElement> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected/12345678", HttpMethod.PUT,
                        entity, EcoElement.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @Test
    public void testAddReviewWithValidLogin() {

        //Given
        EcoElement existingEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 17").creator("Tobias")
                .certificates(List.of()).id("12345").lat(10.0).lon(10.0).reviews(List.of()).adminNote("")
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district(null).isInBochum(true).isReviewed(false)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();

        ecoElementMongoDB.save(existingEcoElement);

        ReviewDto newReviewDto = new ReviewDto(true, "Good shop!");

        Review newReview = Review.builder()
                .positive(true)
                .author("Tobias")
                .reviewComment("Good shop!")
                .dateReviewedExternal("05.12.2020")
                .dateReviewedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .build();

        EcoElement newEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 17").creator("Tobias")
                .certificates(List.of()).id("12345").lat(10.0).lon(10.0).reviews(List.of(newReview)).adminNote(null)
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district(null).isInBochum(true).isReviewed(false)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();


        //When
        when(timestampUtils.generateTimeStamp()).thenReturn(Instant.parse("2020-12-05T10:00:00.00Z"));
        when(timestampUtils.generateReadableDateStamp()).thenReturn("05.12.2020");

        HttpEntity<ReviewDto> entity = getValidAuthorizationEntity(newReviewDto);
        ResponseEntity<EcoElement> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected/review/12345", HttpMethod.PUT,
                        entity, EcoElement.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(newEcoElement));
    }

    @Test
    public void testAddReviewWithValidLoginThatOverwritesExistingOne() {

        //Given
        Review oldReview1 = Review.builder()
                .positive(true)
                .author("Tobias")
                .reviewComment("Good shop, but bad location!")
                .dateReviewedExternal("03.12.2020")
                .dateReviewedInternal(Instant.parse("2020-12-03T10:00:00.00Z"))
                .build();

        Review oldReview2 = Review.builder()
                .positive(false)
                .author("Angela Merkel")
                .reviewComment("Good shop!")
                .dateReviewedExternal("02.12.2020")
                .dateReviewedInternal(Instant.parse("2020-12-02T10:00:00.00Z"))
                .build();

        Review newReview = Review.builder()
                .positive(true)
                .author("Tobias")
                .reviewComment("Good shop!")
                .dateReviewedExternal("05.12.2020")
                .dateReviewedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .build();

        EcoElement existingEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 17").creator("Tobias")
                .certificates(List.of()).id("12345").lat(10.0).lon(10.0).reviews(List.of(oldReview1, oldReview2)).adminNote("")
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district(null).isInBochum(true).isReviewed(false)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();

        ecoElementMongoDB.save(existingEcoElement);

        ReviewDto newReviewDto = new ReviewDto(true, "Good shop!");

        EcoElement newEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 17").creator("Tobias")
                .certificates(List.of()).id("12345").lat(10.0).lon(10.0).reviews(List.of(oldReview2, newReview)).adminNote(null)
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district(null).isInBochum(true).isReviewed(false)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();


        //When
        when(timestampUtils.generateTimeStamp()).thenReturn(Instant.parse("2020-12-05T10:00:00.00Z"));
        when(timestampUtils.generateReadableDateStamp()).thenReturn("05.12.2020");

        HttpEntity<ReviewDto> entity = getValidAuthorizationEntity(newReviewDto);
        ResponseEntity<EcoElement> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected/review/12345", HttpMethod.PUT,
                        entity, EcoElement.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getReviews().size(), is(2));
        assertThat(response.getBody(), is(newEcoElement));
    }

    @Test
    public void testAddReviewWithValidLoginThatOverwritesExistingOneAndReachesReviewThreshold() {

        //Given
        Review oldReview1 = Review.builder()
                .positive(false)
                .author("Tobias")
                .reviewComment("Bad shop and bad location!")
                .dateReviewedExternal("03.12.2020")
                .dateReviewedInternal(Instant.parse("2020-12-03T10:00:00.00Z"))
                .build();

        Review oldReview2 = Review.builder()
                .positive(true)
                .author("Angela Merkel")
                .reviewComment("Good shop!")
                .dateReviewedExternal("02.12.2020")
                .dateReviewedInternal(Instant.parse("2020-12-02T10:00:00.00Z"))
                .build();

        Review oldReview3 = Review.builder()
                .positive(true)
                .author("Donald Trump")
                .reviewComment("Good shop!")
                .dateReviewedExternal("01.12.2020")
                .dateReviewedInternal(Instant.parse("2020-12-01T10:00:00.00Z"))
                .build();

        Review oldReview4 = Review.builder()
                .positive(true)
                .author("Wladimir Putin")
                .reviewComment("Good shop!")
                .dateReviewedExternal("01.12.2020")
                .dateReviewedInternal(Instant.parse("2020-12-01T10:00:00.00Z"))
                .build();

        Review oldReview5 = Review.builder()
                .positive(false)
                .author("Pope Franziskus")
                .reviewComment("Bad shop!")
                .dateReviewedExternal("01.12.2020")
                .dateReviewedInternal(Instant.parse("2020-12-01T10:00:00.00Z"))
                .build();

        Review newReview = Review.builder()
                .positive(true)
                .author("Tobias")
                .reviewComment("Good shop!")
                .dateReviewedExternal("05.12.2020")
                .dateReviewedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .build();

        EcoElement existingEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 17").creator("Tobias")
                .certificates(List.of()).id("12345").lat(10.0).lon(10.0).reviews(List.of(oldReview1, oldReview2,
                        oldReview3, oldReview4, oldReview5)).adminNote("")
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district(null).isInBochum(true).isReviewed(false)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();

        ecoElementMongoDB.save(existingEcoElement);

        ReviewDto newReviewDto = new ReviewDto(true, "Good shop!");

        EcoElement newEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 17").creator("Tobias")
                .certificates(List.of()).id("12345").lat(10.0).lon(10.0).reviews(List.of(oldReview2, oldReview3,
                        oldReview4, oldReview5, newReview)).adminNote(null)
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("05.12.2020")
                .dateReviewedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).district(null).isInBochum(true).isReviewed(true)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();


        //When
        when(timestampUtils.generateTimeStamp()).thenReturn(Instant.parse("2020-12-05T10:00:00.00Z"));
        when(timestampUtils.generateReadableDateStamp()).thenReturn("05.12.2020");

        HttpEntity<ReviewDto> entity = getValidAuthorizationEntity(newReviewDto);
        ResponseEntity<EcoElement> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected/review/12345", HttpMethod.PUT,
                        entity, EcoElement.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getReviews().size(), is(5));
        assertThat(response.getBody(), is(newEcoElement));
    }

    @Test
    public void testAddReviewShouldThrowWithBadID() {

        //Given
        EcoElement existingEcoElement = EcoElement.builder().name("Testrestaurant").category(Category.RESTAURANT)
                .categorySub(CategorySub.RESTAURANT_RESTAURANT).address("Verkehrsstrasse 17").creator("Tobias")
                .certificates(List.of()).id("12345").lat(10.0).lon(10.0).reviews(List.of()).adminNote("")
                .dateCreatedExternal("05.12.2020").dateLastUpdatedExternal("05.12.2020")
                .dateCreatedInternal(Instant.parse("2020-12-05T10:00:00.00Z"))
                .dateLastUpdatedInternal(Instant.parse("2020-12-05T10:00:00.00Z")).dateReviewedExternal("")
                .dateReviewedInternal(null).district(null).isInBochum(true).isReviewed(false)
                .isShownOnMap(true).isVisible(true).openingTimes(null).subtitle(null).url(null)
                .urlFacebook(null).build();

        ecoElementMongoDB.save(existingEcoElement);

        ReviewDto newReviewDto = new ReviewDto(true, "Good shop!");

        //When
        when(timestampUtils.generateTimeStamp()).thenReturn(Instant.parse("2020-12-05T10:00:00.00Z"));
        when(timestampUtils.generateReadableDateStamp()).thenReturn("05.12.2020");

        HttpEntity<ReviewDto> entity = getInvalidAuthorizationEntity(newReviewDto);
        ResponseEntity<EcoElement> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected/12345678", HttpMethod.PUT,
                        entity, EcoElement.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

    @Test
    public void testDeleteEcoElementWithValidLogin() {

        //pre-method assertion that element does exist
        boolean ecoElementDoesInitiallyExist = ecoElementMongoDB.existsById("111");

        //When
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<Void> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected/111", HttpMethod.DELETE,
                        entity, Void.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        boolean ecoElementStillPresent = ecoElementMongoDB.existsById("111");
        assertThat(ecoElementDoesInitiallyExist, is(true));
        assertThat(ecoElementStillPresent, is(false));
    }

    @Test
    public void testDeleteEcoElementWithInvalidLogin() {

        //pre-method assertion that element does exist
        boolean ecoElementDoesInitiallyExist = ecoElementMongoDB.existsById("111");

        //When
        HttpEntity<Void> entity = getInvalidAuthorizationEntity(null);
        ResponseEntity<Void> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected/111", HttpMethod.DELETE,
                        entity, Void.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
        boolean ecoElementStillPresent = ecoElementMongoDB.existsById("111");
        assertThat(ecoElementDoesInitiallyExist, is(true));
        assertThat(ecoElementStillPresent, is(true));
    }

    @Test
    public void testDeleteEcoElementWithValidLoginButPrincipalIsNotCreator() {

        //pre-method assertion that element does exist
        boolean ecoElementDoesInitiallyExist = ecoElementMongoDB.existsById("222");

        //When
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<Void> response =
                restTemplate.exchange("http://localhost:" + port + "/api/elements/protected/111", HttpMethod.DELETE,
                        entity, Void.class);

        //Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        boolean ecoElementStillPresent = ecoElementMongoDB.existsById("222");
        assertThat(ecoElementDoesInitiallyExist, is(true));
        assertThat(ecoElementStillPresent, is(true));
    }

}