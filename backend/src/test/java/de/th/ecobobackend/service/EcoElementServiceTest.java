package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.Review;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.dto.ReviewDto;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.model.enums.NewsfeedType;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
import de.th.ecobobackend.service.utils.EcoElementSeeder;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import static org.junit.jupiter.api.Assertions.fail;

import java.security.Principal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.hamcrest.Matchers.*;
import static org.hamcrest.MatcherAssert.*;

class EcoElementServiceTest {

    //Given for all Tests

    final EcoElementMongoDB ecoElementMongoDB = mock(EcoElementMongoDB.class);
    final EcoElementBuilder ecoElementBuilder = mock(EcoElementBuilder.class);
    final NewsfeedService newsfeedService = mock(NewsfeedService.class);
    final IDUtils idUtils = mock(IDUtils.class);
    final TimestampUtils timestampUtils = new TimestampUtils();
    final EcoElementService ecoElementService = new EcoElementService(ecoElementMongoDB, ecoElementBuilder,
                                                                        newsfeedService, idUtils, timestampUtils);
    final EcoElementSeeder ecoElementSeeder = new EcoElementSeeder();
    final Principal mockedPrincipal = mock(Principal.class);

    @Test
    @DisplayName("The findByID method should return one corresponding object")
    void getElementByIDShouldReturnElement(){
        //When
        when(ecoElementMongoDB.findById("123")).thenReturn(ecoElementSeeder.get1HardcodedEcoElementForTesting());

        //Then
        assertThat(ecoElementService.findById("123"), is(ecoElementSeeder.get1HardcodedEcoElementForTesting().get()));
    }

    @Test
    @DisplayName("The findByID method should throw an error when object is not found")
    void getElementByIDShouldThrow(){
        //When
        when(ecoElementMongoDB.findById("1234"))
                .thenReturn(Optional.empty());

        //Then
        try {
            ecoElementService.findById("1234");
            fail();
        }
        catch (ResponseStatusException exception) {
            assertThat(exception.getStatus(), is(HttpStatus.NOT_FOUND));
        }
    }

    @Test
    @DisplayName("The findByName method should return one corresponding object")
    void getElementByNameShouldReturnElement(){
        //When
        when(ecoElementMongoDB.findByName("TestElement"))
                .thenReturn(ecoElementSeeder.get1HardcodedEcoElementForTesting());

        //Then
        assertThat(ecoElementService.findByName("TestElement"), is(ecoElementSeeder.get1HardcodedEcoElementForTesting().get()));
    }

    @Test
    @DisplayName("The findByName method should throw an error when object is not found")
    void getElementByNameShouldThrow(){
        //When
        when(ecoElementMongoDB.findByName("TestElement"))
                .thenReturn(Optional.empty());

        //Then
        try {
            ecoElementService.findByName("testElement");
            fail();
            } catch (ResponseStatusException exception) {
            assertThat(exception.getStatus(), is(HttpStatus.NOT_FOUND));
        }
    }

    @Test
    @DisplayName("The findAllByCategory method should return a list of corresponding objects")
    void getElementsByCategoryShouldReturnElements(){
        //When
        when(ecoElementMongoDB.findAllByCategory(Category.FOODSTORE))
                .thenReturn(Optional.of(ecoElementSeeder.get4RandomEcoElementsForTesting()));

        //Then
        assertThat(ecoElementService.findAllByCategory(Category.FOODSTORE).size(), is(4));
        assertThat(ecoElementService.findAllByCategory(Category.FOODSTORE).get(0).getCreator(), is("Tobias"));
        assertThat(ecoElementService.findAllByCategory(Category.FOODSTORE).get(1).getName(), is("TestElement"));
    }

    @Test
    @DisplayName("The findAllByCategory method should throw if no object corresponds to the category")
    void getElementsByCategoryShouldThrow(){
        //When
        when(ecoElementMongoDB.findAllByCategory(Category.FAIRSHOP))
                .thenReturn(Optional.empty());

        //Then
        try {
            ecoElementService.findAllByCategory(Category.FAIRSHOP);
            fail();
        } catch (ResponseStatusException exception ){
            assertThat(exception.getStatus(), is(HttpStatus.NOT_FOUND));
        }
    }

    @Test
    @DisplayName("The addEcoElement method should return the same object")
    void addEcoElementShouldReturnEcoElement(){
        //Given

        String inputDate = "2020-11-17T10:51:00Z";
        String inputDateReadable = "17.11.2020";
        Instant inputDateAsInstant = Instant.parse(inputDate);

        EcoElementDto incomingEcoElementDto = new EcoElementDto("Bioladen", Category.FOODSTORE, CategorySub.FOODSTORE_NORMAL,
                "", "", "", "", "", "", "",
                true, List.of("Veganes Angebot"), 1.0, 1.0, "Tobias");

        EcoElement expectedEcoElement = EcoElement.builder()
                .id("123")
                .name("Bioladen")
                .category(Category.FOODSTORE)
                .categorySub(CategorySub.FOODSTORE_NORMAL)
                .subtitle("")
                .district("")
                .address("")
                .openingTimes("")
                .adminNote("")
                .url("")
                .creator("Tobias")
                .urlFacebook("")
                .isInBochum(true)
                .isReviewed(true)
                .certificates(List.of("Veganes Angebot"))
                .reviews(List.of())
                .lon(1.0)
                .lat(1.0)
                .dateCreatedInternal(inputDateAsInstant)
                .dateCreatedExternal(inputDateReadable)
                .build();

        //When
        when(ecoElementBuilder.build(incomingEcoElementDto, "123"))
                .thenReturn(expectedEcoElement);
        when(ecoElementMongoDB.save(expectedEcoElement))
                .thenReturn(expectedEcoElement);
        when(idUtils.generateID()).thenReturn("123");
        EcoElement receivedEcoElement = ecoElementService.addEcoElement(incomingEcoElementDto);

        //Then
        assertThat(receivedEcoElement.getName(), is(expectedEcoElement.getName()));
        assertThat(receivedEcoElement.getCategory(), is(expectedEcoElement.getCategory()));
        assertThat(receivedEcoElement.getCategorySub(), is(expectedEcoElement.getCategorySub()));
        assertThat(receivedEcoElement.getCreator(), is(expectedEcoElement.getCreator()));
        assertThat(receivedEcoElement.getLat(), is(expectedEcoElement.getLat()));
        verify(ecoElementMongoDB).save(expectedEcoElement);
        verify(newsfeedService).addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_ADDED, expectedEcoElement.getName(),
                expectedEcoElement.getCreator(), expectedEcoElement.getCategorySub(), "123");
    }

    @Test
    @DisplayName("The updateEcoElement method should return the updated object.")
    void updateEcoElementShouldReturnEcoElement(){
        //Given
        EcoElement existingEcoElement = EcoElement.builder().name("Bioladen").category(Category.FOODSTORE).categorySub(CategorySub.FOODSTORE_NORMAL)
                .subtitle("").district("").address("").openingTimes("").adminNote("").url("").urlFacebook("")
                .isInBochum(true).certificates(List.of("Veganes Angebot")).lon(1.0).lat(1.0).creator("Testperson").build();

        EcoElementDto incomingEcoElementDto = new EcoElementDto("Bioladen", Category.FOODSTORE, CategorySub.FOODSTORE_NORMAL,
                "", "", "Verkehrsstrasse 49", "", "", "", "",
                true, List.of("Veganes Angebot"), 1.0, 1.0, "Testperson");

        EcoElement expectedUpdatedEcoElement = existingEcoElement;
        expectedUpdatedEcoElement.setAddress("Verkehrsstrasse 49");

        //When
        when(ecoElementMongoDB.findById("123")).thenReturn(Optional.of(existingEcoElement));
        when(ecoElementBuilder.buildUpdatedEcoElement(incomingEcoElementDto, existingEcoElement, "123"))
                .thenReturn(expectedUpdatedEcoElement);
        when(ecoElementMongoDB.save(expectedUpdatedEcoElement))
                .thenReturn(expectedUpdatedEcoElement);
        when(mockedPrincipal.getName()).thenReturn("Testperson");
        EcoElement receivedEcoElement = ecoElementService.updateEcoElement(incomingEcoElementDto, "123", mockedPrincipal);

        //Then
        assertThat(receivedEcoElement, is(expectedUpdatedEcoElement));
        assertThat(receivedEcoElement.getAddress(), is(incomingEcoElementDto.getAddress()));
        verify(newsfeedService).addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_UPDATED, existingEcoElement.getName(),
                existingEcoElement.getCreator(), existingEcoElement.getCategorySub(), "123");
    }

    @Test
    @DisplayName("The updateEcoElement method should throw if existing creator and principal don't match.")
    void updateEcoElementShouldThrowIfPrincipalIsNotTheCreator(){
        //Given
        EcoElement existingEcoElement = EcoElement.builder().id("123").name("Bioladen").category(Category.FOODSTORE).categorySub(CategorySub.FOODSTORE_NORMAL)
                .subtitle("").district("").address("").openingTimes("").adminNote("").url("").urlFacebook("")
                .isInBochum(true).certificates(List.of("Veganes Angebot")).lon(1.0).lat(1.0).creator("Testperson").build();

        EcoElementDto incomingEcoElementDto = new EcoElementDto("Bioladen", Category.FOODSTORE, CategorySub.FOODSTORE_NORMAL,
                "", "", "Verkehrsstrasse 49", "", "", "", "",
                true, List.of("Veganes Angebot"), 1.0, 1.0, "Donald Trump");

        //When
        when(ecoElementMongoDB.findById("123")).thenReturn(Optional.of(existingEcoElement));
        when(mockedPrincipal.getName()).thenReturn("Donald Trump");

        //Then
        try {
            ecoElementService.updateEcoElement(incomingEcoElementDto, "123", mockedPrincipal);
            fail();
        } catch (ResponseStatusException exception ){
            assertThat(exception.getStatus(), is(HttpStatus.FORBIDDEN));
        }
        verifyNoInteractions(newsfeedService);
    }


    @Test
    @DisplayName("The delete method should call the remove method of the MongoDB")
    void deleteEcoElementShouldCallRemoveMethod(){
        //Given
        EcoElement existingEcoElement = EcoElement.builder().id("123").name("Bioladen").category(Category.FOODSTORE).categorySub(CategorySub.FOODSTORE_NORMAL)
                .subtitle("").district("").address("").openingTimes("").adminNote("").url("").urlFacebook("")
                .isInBochum(true).certificates(List.of("Veganes Angebot")).lon(1.0).lat(1.0).creator("Testperson").build();

        //When
        when(ecoElementMongoDB.findById("123")).thenReturn(Optional.of(existingEcoElement));
        when(mockedPrincipal.getName()).thenReturn("Testperson");
        ecoElementService.deleteEcoElement("123", mockedPrincipal);

        //Then
        verify(ecoElementMongoDB).deleteById("123");
        verify(newsfeedService).addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_DELETED, existingEcoElement.getName(),
                existingEcoElement.getCreator(), existingEcoElement.getCategorySub(), "");
    }

    @Test
    @DisplayName("The delete method should throw if the principal is not the creator")
    void deleteEcoElementShouldThrowIfCreatorIsNotPrincipal(){
        //Given
        EcoElement existingEcoElement = EcoElement.builder().id("123").name("Bioladen").category(Category.FOODSTORE).categorySub(CategorySub.FOODSTORE_NORMAL)
                .subtitle("").district("").address("").openingTimes("").adminNote("").url("").urlFacebook("")
                .isInBochum(true).certificates(List.of("Veganes Angebot")).lon(1.0).lat(1.0).creator("Testperson").build();

        //When
        when(ecoElementMongoDB.findById("123")).thenReturn(Optional.of(existingEcoElement));
        when(mockedPrincipal.getName()).thenReturn("Donald Trump");

        //Then
        try {
            ecoElementService.deleteEcoElement("123", mockedPrincipal);
            fail();
        } catch (ResponseStatusException exception ){
            assertThat(exception.getStatus(), is(HttpStatus.FORBIDDEN));
        }
        verifyNoInteractions(newsfeedService);
    }

    @Test
    @DisplayName("The addReview method should return the object updated with a new review.")
    void addReviewToEcoElementShouldReturnUpdatedEcoElement() {
        //Given
        Review review1 = Review.builder()
                .reviewComment("Nice shop!")
                .author("Angela Merkel")
                .positive(true)
                .build();
        List<Review> filledReviewList = new ArrayList<>(List.of(review1));

        ReviewDto incomingReviewDto = new ReviewDto(true, "Nice shop!");

        EcoElement existingEcoElement = EcoElement.builder().id("123").name("Bioladen").category(Category.FOODSTORE).categorySub(CategorySub.FOODSTORE_NORMAL)
                .subtitle("").district("").address("").openingTimes("").adminNote("").url("").urlFacebook("")
                .isInBochum(true).certificates(List.of("Veganes Angebot")).lon(1.0).lat(1.0).creator("Testperson")
                .reviews(null).build();

        EcoElement expectedUpdatedEcoElement = existingEcoElement;
        expectedUpdatedEcoElement.setReviews(filledReviewList);

        //When
        when(mockedPrincipal.getName()).thenReturn("Testperson");
        when(ecoElementMongoDB.findById("123")).thenReturn(Optional.of(existingEcoElement));
        when(ecoElementBuilder.buildUpdatedEcoElementWithReview(incomingReviewDto, existingEcoElement, "123", mockedPrincipal, false))
                .thenReturn(expectedUpdatedEcoElement);
        when(ecoElementMongoDB.save(expectedUpdatedEcoElement))
                .thenReturn(expectedUpdatedEcoElement);
        EcoElement receivedEcoElement = ecoElementService.addReviewToEcoElement("123", incomingReviewDto, mockedPrincipal);

        //Then
        assertThat(receivedEcoElement, is(expectedUpdatedEcoElement));
        assertThat(receivedEcoElement.getReviews().size(), is(1));
        assertThat(receivedEcoElement.getReviews(), contains(review1));
        verifyNoInteractions(newsfeedService);
    }


    @Test
    @DisplayName("The addReview method should overwrite existing reviews of the same author.")
    void addReviewToEcoElementShouldOverwriteExistingReviewsOfSameAuthor(){
        //Given
        Review review1 = Review.builder()
                .reviewComment("Nice shop!")
                .author("Angela Merkel")
                .positive(true)
                .build();
        List<Review> filledReviewList = new ArrayList<>(List.of(review1));

        ReviewDto incomingReviewDto = new ReviewDto(true, "Nice shop!");

        EcoElement existingEcoElement = EcoElement.builder().id("123").name("Bioladen").category(Category.FOODSTORE).categorySub(CategorySub.FOODSTORE_NORMAL)
                .subtitle("").district("").address("").openingTimes("").adminNote("").url("").urlFacebook("")
                .isInBochum(true).certificates(List.of("Veganes Angebot")).lon(1.0).lat(1.0).creator("Testperson")
                .reviews(filledReviewList).build();

        EcoElement expectedUpdatedEcoElement = existingEcoElement;
        expectedUpdatedEcoElement.setReviews(filledReviewList);

        //When
        when(mockedPrincipal.getName()).thenReturn("Angela Merkel");
        when(ecoElementMongoDB.findById("123")).thenReturn(Optional.of(existingEcoElement));
        when(ecoElementBuilder.buildUpdatedEcoElementWithReview(incomingReviewDto, existingEcoElement, "123", mockedPrincipal, true))
                .thenReturn(expectedUpdatedEcoElement);
        when(ecoElementMongoDB.save(expectedUpdatedEcoElement))
                .thenReturn(expectedUpdatedEcoElement);
        EcoElement receivedEcoElement = ecoElementService.addReviewToEcoElement("123", incomingReviewDto, mockedPrincipal);

        //Then
        assertThat(receivedEcoElement, is(expectedUpdatedEcoElement));
        assertThat(receivedEcoElement.getReviews().size(), is(1));
        assertThat(receivedEcoElement.getReviews(), contains(review1));
        verifyNoInteractions(newsfeedService);
    }

    @Test
    @DisplayName("The addReview method should update the reviw status once 3 positive reviews are reached.")
    void addReviewToEcoElementShouldAddReviewAndSetReviewStatusIfAmountCriteriaIsMatched(){
        //Given
        Review review1 = Review.builder()
                .reviewComment("Nice shop!")
                .author("Wladimir Putin")
                .positive(true)
                .build();
        Review review2 = Review.builder()
                .reviewComment("Nice shop!")
                .author("Donald Trump")
                .positive(true)
                .build();
        Review review3 = Review.builder()
                .reviewComment("Nice shop!")
                .author("Angela Merkel")
                .positive(true)
                .build();

        List<Review> filledReviewList2 = new ArrayList<>(List.of(review1, review2));
        List<Review> filledReviewList3 = new ArrayList<>(List.of(review1, review2, review3));

        ReviewDto incomingReviewDto = new ReviewDto(true, "Nice shop!");

        EcoElement existingEcoElement = EcoElement.builder().id("123").name("Bioladen").category(Category.FOODSTORE).categorySub(CategorySub.FOODSTORE_NORMAL)
                .subtitle("").district("").address("").openingTimes("").adminNote("").url("").urlFacebook("")
                .isInBochum(true).certificates(List.of("Veganes Angebot")).lon(1.0).lat(1.0).creator("Testperson")
                .reviews(filledReviewList2).isReviewed(false).build();

        //When
        when(mockedPrincipal.getName()).thenReturn("Angela Merkel");
        when(ecoElementMongoDB.findById("123")).thenReturn(Optional.of(existingEcoElement));

        EcoElement expectedUpdatedEcoElement = existingEcoElement;
        expectedUpdatedEcoElement.setReviews(filledReviewList3);

        EcoElement expectedUpdatedEcoElementWithReviewChange = expectedUpdatedEcoElement;
        expectedUpdatedEcoElement.setIsReviewed(true);

        when(ecoElementBuilder.buildUpdatedEcoElementWithReview(incomingReviewDto, existingEcoElement, "123", mockedPrincipal, true))
                .thenReturn(expectedUpdatedEcoElement);
        when(ecoElementMongoDB.save(expectedUpdatedEcoElementWithReviewChange))
                .thenReturn(expectedUpdatedEcoElementWithReviewChange);
        EcoElement receivedEcoElement = ecoElementService.addReviewToEcoElement("123", incomingReviewDto, mockedPrincipal);

        //Then
        assertThat(receivedEcoElement, is(expectedUpdatedEcoElementWithReviewChange));
        assertThat(receivedEcoElement.getReviews().size(), is(3));
        assertThat(receivedEcoElement.getReviews(), containsInAnyOrder(review1, review2, review3));
        assertThat(receivedEcoElement.getIsReviewed(), is(true));
        verify(newsfeedService).addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_REVIEWED,
                existingEcoElement.getName(), existingEcoElement.getCreator(), existingEcoElement.getCategorySub(), existingEcoElement.getId());
    }

    @Test
    @DisplayName("The addReview method should not update the review status if 1 of 3 reviews is negative.")
    void addReviewToEcoElementShouldAddReviewAndNotSetReviewStatusIfAmountCriteriaIsNotMatched(){
        //Given
        Review review1 = Review.builder()
                .reviewComment("Bad shop!")
                .author("Wladimir Putin")
                .positive(false)
                .build();
        Review review2 = Review.builder()
                .reviewComment("Nice shop!")
                .author("Donald Trump")
                .positive(true)
                .build();
        Review review3 = Review.builder()
                .reviewComment("Nice shop!")
                .author("Angela Merkel")
                .positive(true)
                .build();

        List<Review> filledReviewList2 = new ArrayList<>(List.of(review1, review2));
        List<Review> filledReviewList3 = new ArrayList<>(List.of(review1, review2, review3));

        ReviewDto incomingReviewDto = new ReviewDto(true, "Nice shop!");

        EcoElement existingEcoElement = EcoElement.builder().id("123").name("Bioladen").category(Category.FOODSTORE).categorySub(CategorySub.FOODSTORE_NORMAL)
                .subtitle("").district("").address("").openingTimes("").adminNote("").url("").urlFacebook("")
                .isInBochum(true).certificates(List.of("Veganes Angebot")).lon(1.0).lat(1.0).creator("Testperson")
                .reviews(filledReviewList2).isReviewed(false).build();

        //When
        when(mockedPrincipal.getName()).thenReturn("Angela Merkel");
        when(ecoElementMongoDB.findById("123")).thenReturn(Optional.of(existingEcoElement));

        EcoElement expectedUpdatedEcoElement = existingEcoElement;
        expectedUpdatedEcoElement.setReviews(filledReviewList3);

        EcoElement expectedUpdatedEcoElementWithReviewChange = expectedUpdatedEcoElement;

        when(ecoElementBuilder.buildUpdatedEcoElementWithReview(incomingReviewDto, existingEcoElement, "123", mockedPrincipal, true))
                .thenReturn(expectedUpdatedEcoElement);
        when(ecoElementMongoDB.save(expectedUpdatedEcoElementWithReviewChange))
                .thenReturn(expectedUpdatedEcoElementWithReviewChange);
        EcoElement receivedEcoElement = ecoElementService.addReviewToEcoElement("123", incomingReviewDto, mockedPrincipal);

        //Then
        assertThat(receivedEcoElement, is(expectedUpdatedEcoElementWithReviewChange));
        assertThat(receivedEcoElement.getReviews().size(), is(3));
        assertThat(receivedEcoElement.getReviews(), containsInAnyOrder(review1, review2, review3));
        assertThat(receivedEcoElement.getIsReviewed(), is(false));
        verifyNoInteractions(newsfeedService);
    }



}