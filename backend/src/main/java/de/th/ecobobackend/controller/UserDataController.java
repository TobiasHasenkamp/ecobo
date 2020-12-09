package de.th.ecobobackend.controller;

import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.security.MongoDBUserDetailsService;
import de.th.ecobobackend.service.UserProfileService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/acc/userdata")
public class UserDataController {

    private final UserProfileService userProfileService;
    private final MongoDBUserDetailsService mongoDBUserDetailsService;

    @Autowired
    public UserDataController(UserProfileService userProfileService, MongoDBUserDetailsService mongoDBUserDetailsService) {
        this.userProfileService = userProfileService;
        this.mongoDBUserDetailsService = mongoDBUserDetailsService;
    }

    @GetMapping("{username}")
    public UserProfile getUserData(@PathVariable @NonNull Optional<String> username, Principal principal){

        //additional security check (should not be necessary, as the filter already blocks this request)
        if (principal == null ||
                !mongoDBUserDetailsService.loadUserByUsername(principal.getName()).getUsername().equals(principal.getName())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (username.isPresent()){
            if (username.get().equals(principal.getName())){
                return userProfileService.getUserDataByUsername(username.get());
            }
            else {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
}
