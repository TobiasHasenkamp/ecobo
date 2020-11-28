package de.th.ecobobackend.controller;

import de.th.ecobobackend.model.NewsfeedElement;
import de.th.ecobobackend.service.NewsfeedService;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/newsfeed")
public class NewsfeedController {

    private final NewsfeedService newsfeedService;

    public NewsfeedController(NewsfeedService newsfeedService) {
        this.newsfeedService = newsfeedService;
    }

    @GetMapping
    public List<NewsfeedElement> getNewsfeed(){
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
