package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;

import de.th.ecobobackend.model.Review;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.dto.ReviewDto;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.NewsfeedType;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EcoElementService {

    private final EcoElementMongoDB ecoElementMongoDB;
    private final EcoElementBuilder ecoElementBuilder;
    private final NewsfeedService newsfeedService;
    private final IDUtils idUtils;
    private final TimestampUtils timestampUtils;

    @Autowired
    public EcoElementService(EcoElementMongoDB ecoElementMongoDB, EcoElementBuilder ecoElementBuilder,
                             NewsfeedService newsfeedService, IDUtils idUtils, TimestampUtils timestampUtils){
        this.ecoElementMongoDB = ecoElementMongoDB;
        this.ecoElementBuilder = ecoElementBuilder;
        this.newsfeedService = newsfeedService;
        this.idUtils = idUtils;
        this.timestampUtils = timestampUtils;
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

        String newID = idUtils.generateID();

        newsfeedService.addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_ADDED, ecoElementDto.getName(),
                                        ecoElementDto.getCreator(), ecoElementDto.getCategorySub(), newID);
        return ecoElementMongoDB.save(ecoElementBuilder.build(ecoElementDto, newID));
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
                //have name, category, subcategory, address or certificates changed? then reset any review process or restart one
                if (existingEcoElement.getCategory().equals(ecoElementDto.getCategory()) ||
                        existingEcoElement.getCategorySub().equals(ecoElementDto.getCategorySub()) ||
                        existingEcoElement.getName().equals(ecoElementDto.getName()) ||
                        existingEcoElement.getAddress().equals(ecoElementDto.getAddress()) ||
                        existingEcoElement.getCertificates().equals(ecoElementDto.getCertificates())) {

                        existingEcoElement.setIsReviewed(false);
                        existingEcoElement.setReviews(List.of());
                        existingEcoElement.setDateReviewedExternal(null);
                        existingEcoElement.setDateReviewedInternal(null);
                        existingEcoElement.setAdminNote("Review has been reseted because of an element edit.");
                    }

                EcoElement updatedEcoElement = ecoElementBuilder
                        .buildUpdatedEcoElement(ecoElementDto, existingEcoElement, ecoElementId);

                newsfeedService.addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_UPDATED, ecoElementDto.getName(),
                        existingEcoElement.getCreator(), ecoElementDto.getCategorySub(), ecoElementId);
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
                        existingEcoElement.getCreator(), existingEcoElement.getCategorySub(), "");
                ecoElementMongoDB.deleteById(ecoElementId);
            }
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    public EcoElement addReviewToEcoElement(String ecoElementId, ReviewDto reviewDto, Principal principal) {

        EcoElement existingEcoElement = ecoElementMongoDB.findById(ecoElementId).get();

        if (ecoElementMongoDB.findById(ecoElementId).isPresent()){

            String principalName = principal.getName();
            List<Review> existingReviewsForEcoElement = existingEcoElement.getReviews();
            EcoElement updatedEcoElement;

            List<Review> existingReviewsBySameAuthor = existingReviewsForEcoElement.stream().filter(
                    (review) -> (review.getAuthor().equals(principalName))).collect(Collectors.toList());

            //if the user has already reviewed this item
            if (existingReviewsBySameAuthor.size() != 0){
                updatedEcoElement = ecoElementBuilder
                        .buildUpdatedEcoElementWithReview(reviewDto, existingEcoElement, ecoElementId, principal, true);
            }
            else {
                updatedEcoElement = ecoElementBuilder
                        .buildUpdatedEcoElementWithReview(reviewDto, existingEcoElement, ecoElementId, principal, false);
            }

            //if the EcoElement reaches the review threshold with this new review
            List<Review> positiveReviews = existingEcoElement.getReviews().stream().filter(review -> review.getPositive()).collect(Collectors.toList());

            double positiveReviewPercentage = 100.0 / existingEcoElement.getReviews().size() * positiveReviews.size();
            int numberOfPositiveReviews = positiveReviews.size();

            System.out.println(positiveReviewPercentage);
            System.out.println(numberOfPositiveReviews);

            if (positiveReviewPercentage > 74.0 && numberOfPositiveReviews > 2){
                updatedEcoElement.setIsReviewed(true);
                updatedEcoElement.setDateReviewedInternal(timestampUtils.generateTimeStamp());
                updatedEcoElement.setDateReviewedExternal(timestampUtils.generateReadableDateStamp());
                newsfeedService.addNewsFeedElementForEcoElement(NewsfeedType.ECOELEMENT_REVIEWED,
                        existingEcoElement.getName(), existingEcoElement.getCreator(), existingEcoElement.getCategorySub(), existingEcoElement.getId());
            }

            return ecoElementMongoDB.save(updatedEcoElement);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
