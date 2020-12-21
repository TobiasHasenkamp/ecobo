package de.th.ecobobackend.service;

import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.model.enums.NewsfeedType;
import de.th.ecobobackend.mongoDB.UserProfileMongoDB;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Optional;

@Service
public class UserProfileService {

    private final UserProfileMongoDB userProfileMongoDB;
    private final TimestampUtils timestampUtils;
    private final NewsfeedService newsfeedService;
    private final IDUtils idUtils;
    private final RegistrationMailService registrationMailService;

    @Autowired
    public UserProfileService(UserProfileMongoDB userProfileMongoDB, TimestampUtils timeStampUtils,
                              NewsfeedService newsfeedService, IDUtils idUtils, RegistrationMailService registrationMailService) {
        this.userProfileMongoDB = userProfileMongoDB;
        this.timestampUtils = timeStampUtils;
        this.newsfeedService = newsfeedService;
        this.idUtils = idUtils;
        this.registrationMailService = registrationMailService;
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

    public UserProfile registerNewUser(UserLoginDto userLoginDto, String encryptedPassword) throws MessagingException {

        String eMailToRegister = userLoginDto.getEmail();
        String activationToken = idUtils.generateID();

        UserProfile newUser = UserProfile.builder()
                        .username(userLoginDto.getUsername())
                        .password(encryptedPassword)
                        .email(userLoginDto.getEmail())
                        .activated(false)
                        .registrationDateInternal(timestampUtils.generateTimeStamp())
                        .registrationDateExternal(timestampUtils.generateReadableDateStamp())
                        .activationToken(activationToken)
                        .build();

        registrationMailService.sendRegistrationMail(eMailToRegister, activationToken);
        return userProfileMongoDB.save(newUser);
    }

    public boolean checkIfUserIsActivated(String username){
        if (userProfileMongoDB.findById(username).isPresent()){
            return userProfileMongoDB.findById(username).get().isActivated();
        } else {
            throw new UsernameNotFoundException("User doesn't exist.");
        }
    }

    public void activateNewUser(String activationToken) {

        UserProfile existingUser = userProfileMongoDB.findByActivationTokenEquals(activationToken);

        if (existingUser != null) {
            if (activationToken.equals(existingUser.getActivationToken())) {
                UserProfile updatedUser = UserProfile.builder()
                        .username(existingUser.getUsername())
                        .password(existingUser.getPassword())
                        .email(existingUser.getEmail())
                        .activated(true)
                        .registrationDateInternal(existingUser.getRegistrationDateInternal())
                        .registrationDateExternal(existingUser.getRegistrationDateExternal())
                        .activationToken(null)
                        .build();

                newsfeedService.addNewsFeedElementForUser(updatedUser.getUsername());
                userProfileMongoDB.save(updatedUser);
            } else {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "The activation code for this user is wrong.");
            }
        } else {
            throw new UsernameNotFoundException("User doesn't exist.");
        }
    }
}
