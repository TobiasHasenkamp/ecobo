package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EcoElementService {

    private final EcoElementMongoDB ecoElementMongoDB;

    @Autowired
    public EcoElementService(EcoElementMongoDB ecoElementMongoDB){
        this.ecoElementMongoDB = ecoElementMongoDB;
    }


    //============================================================================
    //main methods
    //============================================================================

    public List<EcoElement> getAllEcoElements(){
        return ecoElementMongoDB.findAll();
    }

    public String addEcoElement(){
        ecoElementMongoDB.save(EcoElement.builder()
                .id("123")
                .name("Testelement")
                .creator("Testcreator")
                .category("Bioladen")
                .build());
        return "123";
    }

}
