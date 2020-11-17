package de.th.ecobobackend.controller;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.service.EcoElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public EcoElement postEcoElement() {
        return ecoElementService.addEcoElement();
    }

    @PostMapping("/random")
    public EcoElement postRandomEcoElement() {
        return ecoElementService.addRandomEcoElement();
    }
}
