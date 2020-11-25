package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.NewsfeedType;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public class EcoElementService {

    private final EcoElementMongoDB ecoElementMongoDB;
    private final EcoElementBuilder ecoElementBuilder;
    private final NewsfeedService newsfeedService;

    @Autowired
    public EcoElementService(EcoElementMongoDB ecoElementMongoDB, EcoElementBuilder ecoElementBuilder,
                             NewsfeedService newsfeedService){
        this.ecoElementMongoDB = ecoElementMongoDB;
        this.ecoElementBuilder = ecoElementBuilder;
        this.newsfeedService = newsfeedService;
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

    public EcoElement addEcoElement(EcoElementDto ecoElementDto){

        newsfeedService.addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_ADDED, ecoElementDto.getName(),
                                        ecoElementDto.getCreator(), ecoElementDto.getCategorySub());
        return ecoElementMongoDB.save(ecoElementBuilder.build(ecoElementDto));
    }

    public EcoElement addRandomEcoElement() {
        return ecoElementMongoDB.save(ecoElementBuilder.buildRandomElement());
    }

    public EcoElement updateEcoElement(EcoElementDto ecoElementDto, String ecoElementId, Principal principal) {

        EcoElement existingEcoElement = ecoElementMongoDB.findById(ecoElementId).get();

        if (ecoElementMongoDB.findById(ecoElementId).isPresent()){
            if (!existingEcoElement.getCreator().equals(principal.getName())){
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
            else{
                EcoElement updatedEcoElement = ecoElementBuilder
                                    .buildUpdatedEcoElement(ecoElementDto, existingEcoElement, ecoElementId);
                newsfeedService.addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_UPDATED, ecoElementDto.getName(),
                        existingEcoElement.getCreator(), ecoElementDto.getCategorySub());
                return ecoElementMongoDB.save(updatedEcoElement);
            }
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteEcoElement(String ecoElementId, Principal principal) {

        if (ecoElementMongoDB.findById(ecoElementId).isPresent()){
            EcoElement existingEcoElement = ecoElementMongoDB.findById(ecoElementId).get();
            if (!existingEcoElement.getCreator().equals(principal.getName())){
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
            else{
                newsfeedService.addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_DELETED, existingEcoElement.getName(),
                        existingEcoElement.getCreator(), existingEcoElement.getCategorySub());
                ecoElementMongoDB.deleteById(ecoElementId);
            }
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}
