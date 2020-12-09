package de.th.ecobobackend.controller;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.dto.ReviewDto;
import de.th.ecobobackend.security.MongoDBUserDetailsService;
import de.th.ecobobackend.service.EcoElementService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/elements")
public class EcoElementController {

    private final EcoElementService ecoElementService;
    private final MongoDBUserDetailsService mongoDBUserDetailsService;

    @Autowired
    public EcoElementController(EcoElementService ecoElementService, MongoDBUserDetailsService mongoDBUserDetailsService){
        this.ecoElementService = ecoElementService;
        this. mongoDBUserDetailsService = mongoDBUserDetailsService;
    }


    //============================================================================
    //main methods
    //============================================================================

    @GetMapping
    public List<EcoElement> getEcoElements() {
        return ecoElementService.getAllEcoElements();
    }

    @GetMapping("{ecoElementId}")
    public EcoElement getEcoElementById(@PathVariable @NonNull Optional<String> ecoElementId){
        if (ecoElementId.isPresent()){
            return ecoElementService.findById(ecoElementId.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/protected")
    public EcoElement postEcoElement(@RequestBody EcoElementDto ecoElementDto, Principal principal) {

        if (principal == null ||
                !mongoDBUserDetailsService.loadUserByUsername(principal.getName()).getUsername().equals(principal.getName())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        ecoElementDto.setCreator(principal.getName());
        return ecoElementService.addEcoElement(ecoElementDto);
    }

    @PutMapping("/protected/{ecoElementId}")
    public EcoElement updateEcoElement(@RequestBody EcoElementDto ecoElementDto,
                                       @PathVariable @NonNull Optional<String> ecoElementId,
                                       Principal principal) {

        //additional security check (should not be necessary, as the filter already blocks this request)
        if (principal == null ||
                !mongoDBUserDetailsService.loadUserByUsername(principal.getName()).getUsername().equals(principal.getName())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (ecoElementId.isPresent()){
            return ecoElementService.updateEcoElement(ecoElementDto, ecoElementId.get(), principal);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/protected/review/{ecoElementId}")
    public EcoElement addReviewToEcoElement(@RequestBody ReviewDto reviewDto,
                                            @PathVariable @NonNull Optional<String> ecoElementId,
                                            Principal principal) {

        //additional security check (should not be necessary, as the filter already blocks this request)
        if (principal == null ||
                !mongoDBUserDetailsService.loadUserByUsername(principal.getName()).getUsername().equals(principal.getName())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (ecoElementId.isPresent()) {
            return ecoElementService.addReviewToEcoElement(ecoElementId.get(), reviewDto, principal);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("protected/{ecoElementId}")
    public void deleteEcoElement(@PathVariable @NonNull Optional<String> ecoElementId, Principal principal){

        //additional security check (should not be necessary, as the filter already blocks this request)
        if (principal == null ||
                !mongoDBUserDetailsService.loadUserByUsername(principal.getName()).getUsername().equals(principal.getName())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (ecoElementId.isPresent()) {
            ecoElementService.deleteEcoElement(ecoElementId.get(), principal);
        }
    }

    @PostMapping("protected//random")
    public EcoElement postRandomEcoElement(Principal principal) {

        //additional security check (should not be necessary, as the filter already blocks this request)
        if (principal == null ||
                !mongoDBUserDetailsService.loadUserByUsername(principal.getName()).getUsername().equals(principal.getName())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        return ecoElementService.addRandomEcoElement();
    }


}
