package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EcoElementService {

    private final EcoElementMongoDB ecoElementMongoDB;
    private final EcoElementBuilder ecoElementBuilder;

    @Autowired
    public EcoElementService(EcoElementMongoDB ecoElementMongoDB, EcoElementBuilder ecoElementBuilder){
        this.ecoElementMongoDB = ecoElementMongoDB;
        this.ecoElementBuilder = ecoElementBuilder;
    }


    //============================================================================
    //main methods
    //============================================================================

    public List<EcoElement> getAllEcoElements(){
        return ecoElementMongoDB.findAll();
    }

    public EcoElement findById(String id){
        Optional<EcoElement> result = ecoElementMongoDB.findById(id);
        if (result.isPresent()){
            return result.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    public EcoElement findByName(String name){
        Optional<EcoElement> result = ecoElementMongoDB.findByName(name);
        if (result.isPresent()){
            return result.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    public List<EcoElement> findAllByCategory(Category category){
        Optional<List<EcoElement>> result = ecoElementMongoDB.findAllByCategory(category);
        if (result.isPresent()){
            return result.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    //not tested yet
    public EcoElement addEcoElement(EcoElementDto ecoElementDto){
        return ecoElementMongoDB.save(ecoElementBuilder.build(ecoElementDto));
    }

    //not tested yet
    public EcoElement addRandomEcoElement() {
        return ecoElementMongoDB.save(ecoElementBuilder.buildRandomElement());
    }
}
