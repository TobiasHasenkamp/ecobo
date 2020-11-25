package de.th.ecobobackend.controller;

import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.service.UserProfileService;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/acc/userdata")
public class UserDataController {

    private final UserProfileService userProfileService;

    public UserDataController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("{username}")
    public UserProfile getUserData(@PathVariable @NonNull Optional<String> username){
        if (username.isPresent()){
            return userProfileService.getUserDataByUsername(username.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
}
