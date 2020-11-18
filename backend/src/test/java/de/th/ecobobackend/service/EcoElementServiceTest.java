package de.th.ecobobackend.service;

import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
import de.th.ecobobackend.service.utils.EcoElementSeeder;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.hamcrest.Matchers.*;
import static org.hamcrest.MatcherAssert.*;

class EcoElementServiceTest {

    //Given for all Tests

    final EcoElementMongoDB ecoElementMongoDB = mock(EcoElementMongoDB.class);
    final IDUtils idUtils = new IDUtils();
    final TimestampUtils timestampUtils = new TimestampUtils();
    final EcoElementBuilder ecoElementBuilder = new EcoElementBuilder(idUtils, timestampUtils);
    final EcoElementService ecoElementService = new EcoElementService(ecoElementMongoDB, ecoElementBuilder);
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
    @DisplayName("The findAllByCategory method should throw if no objects corresponds to the category")
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

}