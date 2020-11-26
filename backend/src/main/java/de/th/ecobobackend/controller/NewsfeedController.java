package de.th.ecobobackend.controller;

import de.th.ecobobackend.model.NewsfeedElement;
import de.th.ecobobackend.service.NewsfeedService;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/auth/newsfeed")
public class NewsfeedController {

    private final NewsfeedService newsfeedService;

    public NewsfeedController(NewsfeedService newsfeedService) {
        this.newsfeedService = newsfeedService;
    }

    @GetMapping
    public List<NewsfeedElement> getNewsfeed(){
        System.out.println("kommt an 1");
        return newsfeedService.getNewsfeed();
    }

    @GetMapping("{amount}")
    public List<NewsfeedElement> getLastNewsfeedElements(@PathVariable @NonNull Optional<Integer> amount){
        if (amount.isPresent()){
            return newsfeedService.getLastNewsfeedElements(amount.get());
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
}
