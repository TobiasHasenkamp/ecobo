package de.th.ecobobackend.service;

import de.th.ecobobackend.model.NewsfeedElement;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.model.enums.NewsfeedType;
import de.th.ecobobackend.mongoDB.NewsfeedMongoDB;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NewsfeedService {

    private final NewsfeedMongoDB newsfeedMongoDB;
    private final IDUtils idUtils;
    private final TimestampUtils timestampUtils;

    public NewsfeedService(NewsfeedMongoDB newsfeedMongoDB, IDUtils idUtils, TimestampUtils timestampUtils) {
        this.newsfeedMongoDB = newsfeedMongoDB;
        this.idUtils = idUtils;
        this.timestampUtils = timestampUtils;
    }

    //============================================================================
    //main methods
    //============================================================================

    public List<NewsfeedElement> getNewsfeed() {
        System.out.println("kommt an 2");
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

    public void addNewsFeedElementForEcoElement(NewsfeedType type, String ecoElementName, String creatorName, CategorySub categorySub){

        String newsfeedMessage = "";

        if (type == NewsfeedType.ECOELEMENT_ADDED){
            newsfeedMessage = ecoElementName + " (" + categorySub + ") was added by " + creatorName + ". Please review!";
        }
        else if (type == NewsfeedType.ECOELEMENT_DELETED){
            newsfeedMessage = ecoElementName + " (" + categorySub + ") was deleted.";
        }
        else if (type == NewsfeedType.ECOELEMENT_IN_DELETE_PROCESS){
            newsfeedMessage = ecoElementName + " (" + categorySub + ") is in Removal process. Please review!";
        }
        else if (type == NewsfeedType.ECOELEMENT_REVIEWED){
            newsfeedMessage = ecoElementName + " (" + categorySub + ") has been reviewed and approved.";
        }
        else if (type == NewsfeedType.ECOELEMENT_UPDATED){
            newsfeedMessage = ecoElementName + " (" + categorySub + ") was updated by " + creatorName + ". Please review!";
        }

        NewsfeedElement newNewsfeedElement = NewsfeedElement.builder()
                .id(idUtils.generateID())
                .number(newsfeedMongoDB.findAll().size() + 1)
                .type(type)
                .message(newsfeedMessage)
                .dateInternal(timestampUtils.generateTimeStamp())
                .dateExternal(timestampUtils.generateReadableDateStamp())
                .build();

        newsfeedMongoDB.save(newNewsfeedElement);
    }

    public void addNewsFeedElementForUser(String userName){

        String newsfeedMessage = "Welcome to our new user " + userName + ".";

        NewsfeedElement newNewsfeedElement = NewsfeedElement.builder()
                .id(idUtils.generateID())
                .number(newsfeedMongoDB.findAll().size() + 1)
                .type(NewsfeedType.USER_REGISTRATION)
                .message(newsfeedMessage)
                .dateInternal(timestampUtils.generateTimeStamp())
                .dateExternal(timestampUtils.generateReadableDateStamp())
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
                .build();

        newsfeedMongoDB.save(newNewsfeedElement);
    }
}
