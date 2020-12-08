package de.th.ecobobackend.controller;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth/registration")
public class RegistrationController {

    private final UserProfileService userProfileService;

    @Autowired
    public RegistrationController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @PostMapping
    public String registration(@RequestBody UserLoginDto loginDto) {

        System.out.println(loginDto.getUsername());

        String usernameToRegister = loginDto.getUsername();
        String passwordToRegister = loginDto.getPassword();

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String passwordToRegisterEncoded = encoder.encode(loginDto.getPassword());

        //check if the passwords is safe enough
        //first general tests
        if (passwordToRegister.length() < 3 || passwordToRegister.isBlank()) {
            return "Password is unsafe. It needs at least 3 characters";
        }
        //second test whether password has at least one digit
        if (!passwordToRegister.matches("(?=.*[0-9]).*")) {
            return "Password is unsafe. It needs at least one digit.";
        }
        //third test whether password has at least one lower case letter
        if (!passwordToRegister.matches("(?=.*[a-z]).*")) {
            return "Password is unsafe. It needs at least one lower case letter.";
        }
        //fourth test whether password has at least one upper case letter
        if (!passwordToRegister.matches("(?=.*[A-Z]).*")) {
            return "Password is unsafe. It needs at least one upper case letter.";
        }

        //check if username is free
        if (!userProfileService.isUsernameOccupied(usernameToRegister)) {
            try {
                //add the username
                userProfileService.registerNewUser(loginDto, passwordToRegisterEncoded);
                return "Registration successful.";
            } catch (Exception e) {
                return "Registration not possible. Please try later.";
            }
        }
        return "Username already exists. Please choose another name.";
    }

}
