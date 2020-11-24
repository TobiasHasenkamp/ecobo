package de.th.ecobobackend.controller;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.service.EcoElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

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

    @PostMapping
    public EcoElement postEcoElement(@RequestBody EcoElementDto ecoElementDto, Principal principal) {
        ecoElementDto.setCreator(principal.getName());
        return ecoElementService.addEcoElement(ecoElementDto);
    }

    @PostMapping("/random")
    public EcoElement postRandomEcoElement() {
        return ecoElementService.addRandomEcoElement();
    }
}
