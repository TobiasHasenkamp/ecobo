package de.th.ecobobackend.controller;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.dto.ReviewDto;
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

    @Autowired
    public EcoElementController(EcoElementService ecoElementService){
        this.ecoElementService = ecoElementService;
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
            System.out.println("test");
            return ecoElementService.findById(ecoElementId.get());
        }
        System.out.println("test2");
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public EcoElement postEcoElement(@RequestBody EcoElementDto ecoElementDto, Principal principal) {
        ecoElementDto.setCreator(principal.getName());
        return ecoElementService.addEcoElement(ecoElementDto);
    }

    @PutMapping("{ecoElementId}")
    public EcoElement updateEcoElement(@RequestBody EcoElementDto ecoElementDto,
                                       @PathVariable @NonNull Optional<String> ecoElementId,
                                       Principal principal) {

        if (ecoElementId.isPresent()){
            return ecoElementService.updateEcoElement(ecoElementDto, ecoElementId.get(), principal);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/review/{ecoElementId}")
    public EcoElement addReviewToEcoElement(@RequestBody ReviewDto reviewDto,
                                            @PathVariable @NonNull Optional<String> ecoElementId,
                                            Principal principal) {

        if (ecoElementId.isPresent()) {
            return ecoElementService.addReviewToEcoElement(ecoElementId.get(), reviewDto, principal);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("{ecoElementId}")
    public void deleteEcoElement(@PathVariable @NonNull Optional<String> ecoElementId, Principal principal){
        if (ecoElementId.isPresent()) {
            ecoElementService.deleteEcoElement(ecoElementId.get(), principal);
        }
    }

    @PostMapping("/random")
    public EcoElement postRandomEcoElement() {
        return ecoElementService.addRandomEcoElement();
    }


}
