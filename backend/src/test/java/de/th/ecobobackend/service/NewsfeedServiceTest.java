package de.th.ecobobackend.service;

import de.th.ecobobackend.model.NewsfeedElement;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.model.enums.NewsfeedType;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
import de.th.ecobobackend.mongoDB.NewsfeedMongoDB;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.*;

class NewsfeedServiceTest {

    //Given for all tests

    final NewsfeedMongoDB newsfeedMongoDB = mock(NewsfeedMongoDB.class);
    final EcoElementMongoDB ecoElementMongoDB = mock(EcoElementMongoDB.class);
    final IDUtils idUtils = mock(IDUtils.class);
    final TimestampUtils timestampUtils = new TimestampUtils();
    final NewsfeedService newsfeedService = new NewsfeedService(newsfeedMongoDB, idUtils, timestampUtils,
            ecoElementMongoDB);

    NewsfeedElement newNewsfeedElementAdded = NewsfeedElement.builder()
            .id(idUtils.generateID())
            .number(newsfeedMongoDB.findAll().size() + 1)
            .type(NewsfeedType.ECOELEMENT_ADDED)
            .message("Bioladen ist neu.")
            .dateInternal(timestampUtils.generateTimeStamp())
            .dateExternal(timestampUtils.generateReadableDateStamp())
            .linkedElement("123")
            .build();

    NewsfeedElement newNewsfeedElementDeleted = NewsfeedElement.builder()
            .id(idUtils.generateID())
            .number(newsfeedMongoDB.findAll().size() + 1)
            .type(NewsfeedType.ECOELEMENT_DELETED)
            .message("Bioladen wurde gelöscht.")
            .dateInternal(timestampUtils.generateTimeStamp())
            .dateExternal(timestampUtils.generateReadableDateStamp())
            .linkedElement("123")
            .build();

    NewsfeedElement newNewsfeedElementUserRegistration = NewsfeedElement.builder()
            .id(idUtils.generateID())
            .number(newsfeedMongoDB.findAll().size() + 1)
            .type(NewsfeedType.USER_REGISTRATION)
            .message("Willkommen Testuser!")
            .dateInternal(timestampUtils.generateTimeStamp())
            .dateExternal(timestampUtils.generateReadableDateStamp())
            .linkedElement("Testuser")
            .build();

    NewsfeedElement newNewsfeedElementAdminMessage = NewsfeedElement.builder()
            .id(idUtils.generateID())
            .number(newsfeedMongoDB.findAll().size() + 1)
            .type(NewsfeedType.ADMIN_MESSAGE)
            .message("This is an admin message!")
            .dateInternal(timestampUtils.generateTimeStamp())
            .dateExternal(timestampUtils.generateReadableDateStamp())
            .linkedElement("")
            .build();

    @Test
    @DisplayName("The addNewsfeedElementForEcoElement method should call the correct method on MongoDB 1")
    void addNewsfeedElementForEcoElementShouldCallCorrectMongoDBMethod1(){
        //When
        newsfeedService.addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_ADDED, "Bioladen",
                "Testperson", CategorySub.FOODSTORE_NORMAL, "123");

        //Then
        verify(newsfeedMongoDB).save(newNewsfeedElementAdded);
    }

    @Test
    @DisplayName("The addNewsfeedElementForEcoElement method should call the correct method on MongoDB 2")
    void addNewsfeedElementForEcoElementShouldCallCorrectMongoDBMethod2(){
        //When
        newsfeedService.addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_DELETED, "Bioladen",
                "Testperson", CategorySub.FOODSTORE_NORMAL, "123");

        //Then
        verify(newsfeedMongoDB).save(newNewsfeedElementDeleted);
    }

    @Test
    @DisplayName("The addNewsfeedElementForUser method should call the correct method on MongoDB")
    void addNewsfeedElementForUserShouldCallCorrectMongoDBMethod(){
        //When
        newsfeedService.addNewsFeedElementForUser("Testuser");

        //Then
        verify(newsfeedMongoDB).save(newNewsfeedElementUserRegistration);
    }

    @Test
    @DisplayName("The addNewsfeedAdminMessage method should call the correct method on MongoDB")
    void addNewsfeedElementForAdminMessageShouldCallCorrectMongoDBMethod(){
        //When
        newsfeedService.addNewsfeedAdminMessage("This is an admin message!");

        //Then
        verify(newsfeedMongoDB).save(newNewsfeedElementAdminMessage);
    }



}