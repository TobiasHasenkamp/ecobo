package de.th.ecobobackend.controller;
import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.service.RegistrationMailService;
import de.th.ecobobackend.service.UserProfileService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


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

        String usernameToRegister = loginDto.getUsername();
        String passwordToRegister = loginDto.getPassword();

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String passwordToRegisterEncoded = encoder.encode(loginDto.getPassword());

        //check if the passwords is safe enough
        //first general tests
        if (passwordToRegister.length() < 3 || passwordToRegister.isBlank()) {
            return "Unsicheres Passwort. Es benötigt mindestens 3 Zeichen.";
        }
        //second test whether password has at least one digit
        if (!passwordToRegister.matches("(?=.*[0-9]).*")) {
            return "Unsicheres Passwort. Es benötigt mindestens eine Ziffer.";
        }
        //third test whether password has at least one lower case letter
        if (!passwordToRegister.matches("(?=.*[a-z]).*")) {
            return "Unsicheres Passwort. Es benötigt mindestens einen Kleinbuchstaben.";
        }
        //fourth test whether password has at least one upper case letter
        if (!passwordToRegister.matches("(?=.*[A-Z]).*")) {
            return "Unsicheres Passwort. Es benötigt mindestens einen Großbuchstaben.";
        }

        //check if username is free
        if (!userProfileService.isUsernameOccupied(usernameToRegister)) {
            try {
                //add the username
                userProfileService.registerNewUser(loginDto, passwordToRegisterEncoded);
                return "Registrierung erfolgreich. Schau in dein E-Mail Postfach für die Bestätigungsemail.";
            } catch (Exception e) {
                return "Registration nicht möglich. Versuche es später noch einmal.";
            }
        }
        return "Username existiert bereits. Versuche es mit einem anderen Namen.";
    }

    @PutMapping("/activation/{activationToken}")
    public String accountActivation(@PathVariable @NonNull Optional<String> activationToken){
        try {
            if (activationToken.isPresent()){
                userProfileService.activateNewUser(activationToken.get());
                return "Accountaktivierung erfolgreich.";
            } else {
                return "Accountaktivierung konnte nicht durchgeführt werden.";
            }
        } catch (Exception e){
            return e.getMessage();
            //return "Accountaktivierung konnte nicht durchgeführt werden.";
        }
    }
}
