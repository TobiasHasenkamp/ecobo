package de.th.ecobobackend.controller;

import de.th.ecobobackend.model.dto.UserLoginDto;
import de.th.ecobobackend.security.JwtUtils;
import de.th.ecobobackend.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

@RestController
@RequestMapping("/auth/login")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserProfileService userProfileService;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserProfileService userProfileService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userProfileService = userProfileService;
    }

    @PostMapping
    public String login(@RequestBody UserLoginDto loginDto){

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        if (!userProfileService.checkIfUserIsActivated(loginDto.getUsername())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Wrong Username or Password");
        }

        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Wrong Username or Password");
        }

        return jwtUtils.createToken(loginDto.getUsername(), new HashMap<>());
    }






}
