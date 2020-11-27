package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.NewsfeedElement;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.model.enums.NewsfeedType;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
import de.th.ecobobackend.mongoDB.NewsfeedMongoDB;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NewsfeedService {

    private final NewsfeedMongoDB newsfeedMongoDB;
    private final EcoElementMongoDB ecoElementMongoDB;
    private final IDUtils idUtils;
    private final TimestampUtils timestampUtils;

    @Autowired
    public NewsfeedService(NewsfeedMongoDB newsfeedMongoDB, IDUtils idUtils, TimestampUtils timestampUtils,
                           EcoElementMongoDB ecoElementMongoDB) {
        this.newsfeedMongoDB = newsfeedMongoDB;
        this.idUtils = idUtils;
        this.timestampUtils = timestampUtils;
        this.ecoElementMongoDB = ecoElementMongoDB;
    }

    //============================================================================
    //main methods
    //============================================================================

    public List<NewsfeedElement> getNewsfeed() {
        return newsfeedMongoDB.findAll();
    }

    public List<NewsfeedElement> getLastNewsfeedElements(int amount) {
        List<NewsfeedElement> newsfeedList = newsfeedMongoDB.findAll();
        ArrayList<NewsfeedElement> newsFeedListToReturn = new java.util.ArrayList<>(List.of());
        int newsfeedLength = newsfeedList.size();

        for (int i = 0; i < amount && i < newsfeedLength; i++) {
            newsFeedListToReturn.add(newsfeedList.get(newsfeedLength - i -1));
        }

        return newsFeedListToReturn;
    }


    public void addNewsFeedElementForEcoElement(NewsfeedType type, String ecoElementName,
                                                String creatorName, CategorySub categorySub, String newId){

        String newsfeedMessage = "";

        if (ecoElementName.length() > 25){
            ecoElementName = ecoElementName.substring(0, 23) + "...";
        }

        if (type == NewsfeedType.ECOELEMENT_ADDED){
            newsfeedMessage = ecoElementName + " ist neu.";
        }
        else if (type == NewsfeedType.ECOELEMENT_DELETED){
            newsfeedMessage = ecoElementName + " wurde gelöscht.";
        }
        else if (type == NewsfeedType.ECOELEMENT_IN_DELETE_PROCESS){
            newsfeedMessage = ecoElementName + " soll gelöscht werden.";
        }
        else if (type == NewsfeedType.ECOELEMENT_REVIEWED){
            newsfeedMessage = ecoElementName + " wurde reviewed.";
        }
        else if (type == NewsfeedType.ECOELEMENT_UPDATED){
            newsfeedMessage = ecoElementName + " hat ein Update.";
        }

        NewsfeedElement newNewsfeedElement = NewsfeedElement.builder()
                .id(idUtils.generateID())
                .number(newsfeedMongoDB.findAll().size() + 1)
                .type(type)
                .message(newsfeedMessage)
                .dateInternal(timestampUtils.generateTimeStamp())
                .dateExternal(timestampUtils.generateReadableDateStamp())
                .linkedElement(newId)
                .build();

        newsfeedMongoDB.save(newNewsfeedElement);
    }

    public void addNewsFeedElementForUser(String userName){

        String originalUsername = userName;

        if (userName.length() > 25){
            userName = userName.substring(0, 23) + "...";
        }

        String newsfeedMessage = "Willkommen " + userName + "!";

        NewsfeedElement newNewsfeedElement = NewsfeedElement.builder()
                .id(idUtils.generateID())
                .number(newsfeedMongoDB.findAll().size() + 1)
                .type(NewsfeedType.USER_REGISTRATION)
                .message(newsfeedMessage)
                .dateInternal(timestampUtils.generateTimeStamp())
                .dateExternal(timestampUtils.generateReadableDateStamp())
                .linkedElement(originalUsername)
                .build();

        newsfeedMongoDB.save(newNewsfeedElement);
    }

    public void addNewsfeedAdminMessage(String message){

        NewsfeedElement newNewsfeedElement = NewsfeedElement.builder()
                .id(idUtils.generateID())
                .number(newsfeedMongoDB.findAll().size() + 1)
                .type(NewsfeedType.ADMIN_MESSAGE)
                .message(message)
                .dateInternal(timestampUtils.generateTimeStamp())
                .dateExternal(timestampUtils.generateReadableDateStamp())
                .linkedElement("")
                .build();

        newsfeedMongoDB.save(newNewsfeedElement);
    }
}
