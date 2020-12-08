package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.Review;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.dto.ReviewDto;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.apache.commons.compress.utils.Lists;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.security.Principal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.hamcrest.MatcherAssert.*;
import static org.mockito.Mockito.mock;

class EcoElementBuilderTest {

    final IDUtils idUtils = new IDUtils();
    final TimestampUtils timestampUtils = new TimestampUtils();
    final EcoElementBuilder ecoElementBuilder = new EcoElementBuilder(idUtils, timestampUtils);
    final Principal mockedPrincipal = mock(Principal.class);

    //Given for all Tests
    Instant inputDateAsInstant = Instant.ofEpochSecond(Instant.now().getEpochSecond());

    EcoElementDto incomingEcoElementDto = new EcoElementDto("Bioladen", Category.FOODSTORE, CategorySub.FOODSTORE_NORMAL,
            "", "", "", "", "", "", "", true,
            List.of("Veganes Angebot"), 1.0, 1.0, "Tobias");

    EcoElementDto incomingUpdatedEcoElementDto = new EcoElementDto("Bioladen", Category.FOODSTORE, CategorySub.FOODSTORE_NORMAL,
            "", "", "Verkehrsstrasse 49", "", "", "", "", true,
            List.of("Veganes Angebot"), 5.0, 3.0, "Tobias");

    EcoElementDto incomingUpdatedEcoElementDtoWithoutAddress = new EcoElementDto("Bioladen", Category.FOODSTORE, CategorySub.FOODSTORE_NORMAL,
            "", "", null, "", "", "", "", true,
            List.of("Veganes Angebot"), 5.0, 3.0, "Tobias");

    Review review1 = Review.builder()
            .reviewComment("Comment1")
            .author("Maximilia Musterfrau")
            .positive(true)
            .build();
    Review review2 = Review.builder()
            .reviewComment("Comment2")
            .author("Donald Trump")
            .positive(false)
            .build();
    Review review3 = Review.builder()
            .reviewComment("Comment3")
            .author("Max Mustermann")
            .positive(false)
            .build();

    List<Review> emptyReviewList = Lists.newArrayList();
    List<Review> filledReviewList = new ArrayList<>(List.of(review1, review2));
    List<Review> filledReviewListWithExistingReviewOfAuthor = new ArrayList<>(List.of(review1, review2, review3));

    EcoElement exampleEcoElement = EcoElement.builder()
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
            .certificates(List.of("Veganes Angebot"))
            .reviews(List.of())
            .lon(1.0)
            .lat(1.0)
            .dateCreatedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .build();

    EcoElement exampleEcoElementWithEmptyReviews = EcoElement.builder()
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
            .certificates(List.of("Veganes Angebot"))
            .reviews(emptyReviewList)
            .lon(1.0)
            .lat(1.0)
            .dateCreatedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .build();

    EcoElement exampleEcoElementWithFilledReviews = EcoElement.builder()
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
            .certificates(List.of("Veganes Angebot"))
            .reviews(filledReviewList)
            .lon(1.0)
            .lat(1.0)
            .dateCreatedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .build();

    EcoElement exampleEcoElementWithFilledAndDuplicateReviews = EcoElement.builder()
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
            .certificates(List.of("Veganes Angebot"))
            .reviews(filledReviewListWithExistingReviewOfAuthor)
            .lon(1.0)
            .lat(1.0)
            .dateCreatedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .build();

    EcoElement exampleEcoElementWithAddress = EcoElement.builder()
            .id("123")
            .name("Bioladen")
            .category(Category.FOODSTORE)
            .categorySub(CategorySub.FOODSTORE_NORMAL)
            .subtitle("")
            .district("")
            .address("Verkehrsstrasse 49")
            .openingTimes("")
            .adminNote("")
            .url("")
            .creator("Tobias")
            .urlFacebook("")
            .isInBochum(true)
            .certificates(List.of("Veganes Angebot"))
            .reviews(List.of())
            .lon(5.0)
            .lat(3.0)
            .dateCreatedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .build();

    EcoElement exampleEcoElementAfterUpdate = EcoElement.builder()
            .id("123")
            .name("Bioladen")
            .category(Category.FOODSTORE)
            .categorySub(CategorySub.FOODSTORE_NORMAL)
            .subtitle("")
            .district("")
            .address("Verkehrsstrasse 49")
            .openingTimes("")
            .adminNote("")
            .url("")
            .creator("Tobias")
            .urlFacebook("")
            .isInBochum(true)
            .certificates(List.of("Veganes Angebot"))
            .reviews(List.of())
            .lon(5.0)
            .lat(3.0)
            .dateCreatedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .build();

    ReviewDto incomingPositiveReviewDto = new ReviewDto(true, "Nice shop!");
    ReviewDto incomingNegativeReviewDto = new ReviewDto(false, "Bad shop!");

    Review expectedPositiveReview = Review.builder().positive(true)
            .reviewComment("Nice shop!")
            .author("Max Mustermann")
            .dateReviewedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .dateReviewedExternal(timestampUtils.generateReadableDateStamp())
            .build();

    Review expectedNegativeReview = Review.builder().positive(false)
            .reviewComment("Bad shop!")
            .author("Max Mustermann")
            .dateReviewedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .dateReviewedExternal(timestampUtils.generateReadableDateStamp())
            .build();

    @Test
    @DisplayName("The build method should build an EcoElement corresponding to the DtoElement it was called with")
    void buildShouldBuildCorrectEcoElement() {
        //When
        EcoElement receivedEcoElement = ecoElementBuilder.build(incomingEcoElementDto, "123");

        //Then
        assertThat(receivedEcoElement.getName(), is(exampleEcoElement.getName()));
        assertThat(receivedEcoElement.getCreator(), is(exampleEcoElement.getCreator()));
        assertThat(receivedEcoElement.getCategory(), is(exampleEcoElement.getCategory()));
        assertThat(receivedEcoElement.getCategorySub(), is(exampleEcoElement.getCategorySub()));
        assertThat(receivedEcoElement.getAddress(), is(exampleEcoElement.getAddress()));
        assertThat(receivedEcoElement.getIsInBochum(), is(exampleEcoElement.getIsInBochum()));
        assertThat(receivedEcoElement.getLon(), is(exampleEcoElement.getLon()));
        assertThat(receivedEcoElement.getLat(), is(exampleEcoElement.getLat()));
        assertThat(receivedEcoElement.getId(), is("123"));
        assertThat(receivedEcoElement.getDateCreatedInternal(), is(inputDateAsInstant));
    }

    @Test
    @DisplayName("The build method should build an updated EcoElement from an update Dto and an existing EcoElement")
    void buildUpdatedEcoElementShouldBuildCorrectEcoElement() {
        //When
        EcoElement receivedEcoElement = ecoElementBuilder.
                buildUpdatedEcoElement(incomingUpdatedEcoElementDto, exampleEcoElement, "123");

        //Then
        assertThat(receivedEcoElement.getName(), is(exampleEcoElementAfterUpdate.getName()));
        assertThat(receivedEcoElement.getCreator(), is(exampleEcoElementAfterUpdate.getCreator()));
        assertThat(receivedEcoElement.getCategory(), is(exampleEcoElementAfterUpdate.getCategory()));
        assertThat(receivedEcoElement.getCategorySub(), is(exampleEcoElementAfterUpdate.getCategorySub()));
        assertThat(receivedEcoElement.getAddress(), is(exampleEcoElementAfterUpdate.getAddress()));
        assertThat(receivedEcoElement.getIsInBochum(), is(exampleEcoElementAfterUpdate.getIsInBochum()));
        assertThat(receivedEcoElement.getLon(), is(exampleEcoElementAfterUpdate.getLon()));
        assertThat(receivedEcoElement.getLat(), is(exampleEcoElementAfterUpdate.getLat()));
        assertThat(receivedEcoElement.getId(), is("123"));
        assertThat(receivedEcoElement.getDateLastUpdatedInternal(), is(inputDateAsInstant));
        assertThat(receivedEcoElement.getDateLastUpdatedExternal(), not(exampleEcoElement.getDateLastUpdatedExternal()));
        assertThat(receivedEcoElement.getDateLastUpdatedInternal(), not(exampleEcoElement.getDateLastUpdatedExternal()));
    }


    @Test
    @DisplayName("The build method should build an updated EcoElement without any changes!")
    void buildUpdatedEcoElementShouldBuildCorrectButUnchangedEcoElement(){
        //When
        EcoElement receivedEcoElement = ecoElementBuilder.
                buildUpdatedEcoElement(incomingEcoElementDto, exampleEcoElement, "123");

        //Then
        assertThat(receivedEcoElement.getName(), is(exampleEcoElement.getName()));
        assertThat(receivedEcoElement.getCreator(), is(exampleEcoElement.getCreator()));
        assertThat(receivedEcoElement.getCategory(), is(exampleEcoElement.getCategory()));
        assertThat(receivedEcoElement.getCategorySub(), is(exampleEcoElement.getCategorySub()));
        assertThat(receivedEcoElement.getAddress(), is(exampleEcoElement.getAddress()));
        assertThat(receivedEcoElement.getIsInBochum(), is(exampleEcoElement.getIsInBochum()));
        assertThat(receivedEcoElement.getLon(), is(exampleEcoElement.getLon()));
        assertThat(receivedEcoElement.getLat(), is(exampleEcoElement.getLat()));
        assertThat(receivedEcoElement.getId(), is("123"));
        assertThat(receivedEcoElement.getDateLastUpdatedInternal(), is(inputDateAsInstant));
        assertThat(receivedEcoElement.getDateLastUpdatedExternal(), not(exampleEcoElement.getDateLastUpdatedExternal()));
        assertThat(receivedEcoElement.getDateLastUpdatedInternal(), not(exampleEcoElement.getDateLastUpdatedExternal()));
    }

    @Test
    @DisplayName("The build method should build an updated EcoElement and don't use the mistakenly empty address value!")
    void buildUpdatedEcoElementShouldBuildCorrectEcoElementAndDontUseEmptyAddressValue(){
        //When
        EcoElement receivedEcoElement = ecoElementBuilder.
                buildUpdatedEcoElement(incomingUpdatedEcoElementDtoWithoutAddress, exampleEcoElementWithAddress, "123");

        //Then
        assertThat(receivedEcoElement.getName(), is(exampleEcoElementWithAddress.getName()));
        assertThat(receivedEcoElement.getCreator(), is(exampleEcoElementWithAddress.getCreator()));
        assertThat(receivedEcoElement.getCategory(), is(exampleEcoElementWithAddress.getCategory()));
        assertThat(receivedEcoElement.getCategorySub(), is(exampleEcoElementWithAddress.getCategorySub()));
        assertThat(receivedEcoElement.getAddress(), is(exampleEcoElementWithAddress.getAddress()));
        assertThat(receivedEcoElement.getIsInBochum(), is(exampleEcoElementWithAddress.getIsInBochum()));
        assertThat(receivedEcoElement.getLon(), is(exampleEcoElementWithAddress.getLon()));
        assertThat(receivedEcoElement.getLat(), is(exampleEcoElementWithAddress.getLat()));
        assertThat(receivedEcoElement.getId(), is("123"));
        assertThat(receivedEcoElement.getDateLastUpdatedInternal(), is(inputDateAsInstant));
        assertThat(receivedEcoElement.getDateLastUpdatedExternal(), not(exampleEcoElementWithAddress.getDateLastUpdatedExternal()));
        assertThat(receivedEcoElement.getDateLastUpdatedInternal(), not(exampleEcoElementWithAddress.getDateLastUpdatedExternal()));
    }

    @Test
    @DisplayName("The build method should add a positive review to an existing EcoElement")
    void buildUpdatedEcoElementWithReviewShouldOnlyAddAPositiveNewReview(){
        //When
        Mockito.when(mockedPrincipal.getName()).thenReturn("Max Mustermann");
        EcoElement receivedEcoElement = ecoElementBuilder.buildUpdatedEcoElementWithReview(incomingPositiveReviewDto,
                exampleEcoElementWithEmptyReviews, "123", mockedPrincipal, false);

        //Then
        assertThat(receivedEcoElement.getName(), is(exampleEcoElement.getName()));
        assertThat(receivedEcoElement.getCreator(), is(exampleEcoElement.getCreator()));
        assertThat(receivedEcoElement.getCategory(), is(exampleEcoElement.getCategory()));
        assertThat(receivedEcoElement.getCategorySub(), is(exampleEcoElement.getCategorySub()));
        assertThat(receivedEcoElement.getAddress(), is(exampleEcoElement.getAddress()));
        assertThat(receivedEcoElement.getIsInBochum(), is(exampleEcoElement.getIsInBochum()));
        assertThat(receivedEcoElement.getLon(), is(exampleEcoElement.getLon()));
        assertThat(receivedEcoElement.getLat(), is(exampleEcoElement.getLat()));
        assertThat(receivedEcoElement.getId(), is("123"));
        assertThat(receivedEcoElement.getDateLastUpdatedInternal(), is(inputDateAsInstant));
        assertThat(receivedEcoElement.getReviews().size(), is(1));
        assertThat(receivedEcoElement.getReviews(), contains(expectedPositiveReview));
    }

    @Test
    @DisplayName("The build method should add a negative review to an existing EcoElement")
    void buildUpdatedEcoElementWithReviewShouldOnlyAddANegativeNewReview(){
        //When
        Mockito.when(mockedPrincipal.getName()).thenReturn("Max Mustermann");
        EcoElement receivedEcoElement = ecoElementBuilder.buildUpdatedEcoElementWithReview(incomingNegativeReviewDto,
                exampleEcoElementWithEmptyReviews, "123", mockedPrincipal, false);

        //Then
        assertThat(receivedEcoElement.getName(), is(exampleEcoElement.getName()));
        assertThat(receivedEcoElement.getCreator(), is(exampleEcoElement.getCreator()));
        assertThat(receivedEcoElement.getCategory(), is(exampleEcoElement.getCategory()));
        assertThat(receivedEcoElement.getCategorySub(), is(exampleEcoElement.getCategorySub()));
        assertThat(receivedEcoElement.getAddress(), is(exampleEcoElement.getAddress()));
        assertThat(receivedEcoElement.getIsInBochum(), is(exampleEcoElement.getIsInBochum()));
        assertThat(receivedEcoElement.getLon(), is(exampleEcoElement.getLon()));
        assertThat(receivedEcoElement.getLat(), is(exampleEcoElement.getLat()));
        assertThat(receivedEcoElement.getId(), is("123"));
        assertThat(receivedEcoElement.getDateLastUpdatedInternal(), is(inputDateAsInstant));
        assertThat(receivedEcoElement.getReviews().size(), is(1));
        assertThat(receivedEcoElement.getReviews(), contains(expectedNegativeReview));
    }

    @Test
    @DisplayName("The build method should add a negative review to an existing EcoElement with two existing reviews")
    void buildUpdatedEcoElementWithReviewShouldAddAReviewToExistingReviewList(){
        //When
        Mockito.when(mockedPrincipal.getName()).thenReturn("Max Mustermann");
        EcoElement receivedEcoElement = ecoElementBuilder.buildUpdatedEcoElementWithReview(incomingNegativeReviewDto,
                exampleEcoElementWithFilledReviews, "123", mockedPrincipal, false);

        //Then
        assertThat(receivedEcoElement.getName(), is(exampleEcoElementWithFilledReviews.getName()));
        assertThat(receivedEcoElement.getCreator(), is(exampleEcoElementWithFilledReviews.getCreator()));
        assertThat(receivedEcoElement.getCategory(), is(exampleEcoElementWithFilledReviews.getCategory()));
        assertThat(receivedEcoElement.getCategorySub(), is(exampleEcoElementWithFilledReviews.getCategorySub()));
        assertThat(receivedEcoElement.getAddress(), is(exampleEcoElementWithFilledReviews.getAddress()));
        assertThat(receivedEcoElement.getIsInBochum(), is(exampleEcoElementWithFilledReviews.getIsInBochum()));
        assertThat(receivedEcoElement.getLon(), is(exampleEcoElementWithFilledReviews.getLon()));
        assertThat(receivedEcoElement.getLat(), is(exampleEcoElementWithFilledReviews.getLat()));
        assertThat(receivedEcoElement.getId(), is("123"));
        assertThat(receivedEcoElement.getDateLastUpdatedInternal(), is(inputDateAsInstant));
        assertThat(receivedEcoElement.getReviews().size(), is(3));
        assertThat(receivedEcoElement.getReviews(), containsInAnyOrder(expectedNegativeReview, review1, review2));
    }


    @Test
    @DisplayName("The build method should add a positive review to an existing EcoElement with existing reviews" +
            "and overwrite an existing Review of the same user.")
    void buildUpdatedEcoElementWithReviewShouldAddAReviewToExistingReviewListAndOverwriteExistingReview(){
        //When
        Mockito.when(mockedPrincipal.getName()).thenReturn("Max Mustermann");
        EcoElement receivedEcoElement = ecoElementBuilder.buildUpdatedEcoElementWithReview(incomingPositiveReviewDto,
                exampleEcoElementWithFilledAndDuplicateReviews, "123", mockedPrincipal, true);

        //Then
        assertThat(receivedEcoElement.getName(), is(exampleEcoElementWithFilledReviews.getName()));
        assertThat(receivedEcoElement.getCreator(), is(exampleEcoElementWithFilledReviews.getCreator()));
        assertThat(receivedEcoElement.getCategory(), is(exampleEcoElementWithFilledReviews.getCategory()));
        assertThat(receivedEcoElement.getCategorySub(), is(exampleEcoElementWithFilledReviews.getCategorySub()));
        assertThat(receivedEcoElement.getAddress(), is(exampleEcoElementWithFilledReviews.getAddress()));
        assertThat(receivedEcoElement.getIsInBochum(), is(exampleEcoElementWithFilledReviews.getIsInBochum()));
        assertThat(receivedEcoElement.getLon(), is(exampleEcoElementWithFilledReviews.getLon()));
        assertThat(receivedEcoElement.getLat(), is(exampleEcoElementWithFilledReviews.getLat()));
        assertThat(receivedEcoElement.getId(), is("123"));
        assertThat(receivedEcoElement.getDateLastUpdatedInternal(), is(inputDateAsInstant));
        assertThat(receivedEcoElement.getReviews().size(), is(3));
        assertThat(receivedEcoElement.getReviews(), containsInAnyOrder(expectedPositiveReview, review1, review2));
    }




}