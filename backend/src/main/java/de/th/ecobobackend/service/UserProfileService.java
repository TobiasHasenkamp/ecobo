package de.th.ecobobackend.service;

import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.model.enums.NewsfeedType;
import de.th.ecobobackend.mongoDB.UserProfileMongoDB;
import de.th.ecobobackend.utils.TimestampUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserProfileService {

    private final UserProfileMongoDB userProfileMongoDB;
    private final TimestampUtils timestampUtils;
    private final NewsfeedService newsfeedService;

    @Autowired
    public UserProfileService(UserProfileMongoDB userProfileMongoDB, TimestampUtils timeStampUtils,
                              NewsfeedService newsfeedService) {
        this.userProfileMongoDB = userProfileMongoDB;
        this.timestampUtils = timeStampUtils;
        this.newsfeedService = newsfeedService;

    }

    //============================================================================
    //main methods
    //============================================================================

    public List<UserProfile> listAllUsers(){
        return userProfileMongoDB.findAll();
    }

    public boolean isUsernameOccupied(String username){
        return userProfileMongoDB.existsById(username);
    }

    public UserProfile getUserDataByUsername(String username){
        Optional<UserProfile> user = userProfileMongoDB.findById(username);
        if (user.isPresent()){
            user.get().setPassword("");
            return user.get();
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    public UserProfile registerNewUser(UserLoginDto userLoginDto, String encryptedPassword){

        UserProfile newUser = UserProfile.builder()
                        .username(userLoginDto.getUsername())
                        .password(encryptedPassword)
                        .registrationDateInternal(timestampUtils.generateTimeStamp())
                        .registrationDateExternal(timestampUtils.generateReadableDateStamp())
                        .build();

        newsfeedService.addNewsFeedElementForUser(userLoginDto.getUsername());
        return userProfileMongoDB.save(newUser);
    }


}
