package de.th.ecobobackend.service;

import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.mongoDB.UserProfileMongoDB;
import de.th.ecobobackend.utils.TimestampUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserProfileService {

    private final UserProfileMongoDB userProfileMongoDB;
    private final TimestampUtils timestampUtils;

    @Autowired
    public UserProfileService(UserProfileMongoDB userProfileMongoDB, TimestampUtils timeStampUtils) {
        this.userProfileMongoDB = userProfileMongoDB;
        this.timestampUtils = timeStampUtils;
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
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    public UserProfile registerNewUser(UserLoginDto userLoginDto, String encryptedPassword){

        SimpleDateFormat dateWithTime = new SimpleDateFormat("dd.MM.yyyy");
        String dateWithoutTime = dateWithTime.format(new Date());

        UserProfile newUser = UserProfile.builder()
                        .username(userLoginDto.getUsername())
                        .password(encryptedPassword)
                        .registrationDate(dateWithoutTime)
                        .build();

        return userProfileMongoDB.save(newUser);
    }


}
