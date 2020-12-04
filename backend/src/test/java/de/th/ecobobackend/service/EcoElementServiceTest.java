package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.dto.EcoElementDto;
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

import java.time.Instant;
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
    final TimestampUtils timestampUtils = mock(TimestampUtils.class);
    final EcoElementService ecoElementService = new EcoElementService(ecoElementMongoDB, ecoElementBuilder,
                                                                        newsfeedService, idUtils, timestampUtils);
    final EcoElementSeeder ecoElementSeeder = new EcoElementSeeder();

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
                true, List.of("Veganes Angebot"), 1.0, 1.0, "Testperson");

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
    }

}