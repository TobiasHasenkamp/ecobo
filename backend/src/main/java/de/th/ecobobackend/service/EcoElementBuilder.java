package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.Review;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.dto.ReviewDto;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EcoElementBuilder {

    private final IDUtils idUtils;
    private final TimestampUtils timestampUtils;

    public EcoElementBuilder(IDUtils idUtils, TimestampUtils timeStampUtils) {
        this.idUtils = idUtils;
        this.timestampUtils = timeStampUtils;
    }

    public EcoElement build(EcoElementDto ecoElementDto, String newID){

        if (ecoElementDto.getCategorySub() == null){
            ecoElementDto.setCategorySub(CategorySub.NONE);
        }
        if (ecoElementDto.getLat() == null){
            ecoElementDto.setLat(0.0);
        }
        if (ecoElementDto.getLon() == null){
            ecoElementDto.setLon(0.0);
        }

        return EcoElement.builder()
                .id(newID)
                .name(ecoElementDto.getName())
                .category(ecoElementDto.getCategory())
                .categorySub(ecoElementDto.getCategorySub())
                //the other attributes will be used later
                //.subtitle(ecoElementDto.getSubtitle())
                //.district(ecoElementDto.getDistrict())
                .address(ecoElementDto.getAddress())
                //.openingTimes(ecoElementDto.getOpeningTimes())
                //.adminNote(ecoElementDto.getAdminNote())
                //.url(ecoElementDto.getUrl())
                //.urlFacebook(ecoElementDto.getUrlFacebook())
                .isVisible(true)
                .isReviewed(false)
                .isShownOnMap(true)
                .isInBochum(true)
                .certificates(ecoElementDto.getCertificates())
                .creator(ecoElementDto.getCreator())
                .dateCreatedInternal(timestampUtils.generateTimeStamp())
                .dateLastUpdatedInternal(timestampUtils.generateTimeStamp())
                .dateReviewedInternal(null)
                .dateCreatedExternal(timestampUtils.generateReadableDateStamp())
                .dateLastUpdatedExternal(timestampUtils.generateReadableDateStamp())
                .dateReviewedExternal("")
                .dateReviewedInternal(null)
                .reviews(List.of())
                .lon(ecoElementDto.getLon())
                .lat(ecoElementDto.getLat())
                .adminNote("")
                .build();
    }

    public EcoElement buildRandomElement(){
        return EcoElement.builder()
                .id(idUtils.generateID())
                .name("TestElement")
                .category(Category.FOODSTORE)
                .categorySub(CategorySub.FOODSTORE_NORMAL)
                .subtitle("a nice small Bioladen")
                .district("Bo-Mitte")
                .address("Teststr. 49")
                .openingTimes("Mo-Di 6-20 Uhr")
                .adminNote("")
                .url("www.testurl.de")
                .urlFacebook("www.facebooktesturl.de")
                .isVisible(true)
                .isReviewed(true)
                .isShownOnMap(true)
                .isInBochum(true)
                .certificates(List.of("Veganes Angebot", "Abholservice"))
                .creator("Tobias")
                .dateCreatedInternal(timestampUtils.generateTimeStamp())
                .dateLastUpdatedInternal(timestampUtils.generateTimeStamp())
                .dateReviewedInternal(null)
                .dateCreatedExternal(timestampUtils.generateReadableDateStamp())
                .dateReviewedExternal(timestampUtils.generateReadableDateStamp())
                .dateReviewedExternal("")
                .reviews(List.of())
                .lon(51.47030285)
                .lat(7.21021848113432)
                .build();
    }


    public EcoElement buildUpdatedEcoElement(EcoElementDto ecoElementDto, EcoElement existingEcoElement, String ecoElementId) {

        if (ecoElementDto.getCategorySub() == null){
            ecoElementDto.setCategorySub(CategorySub.NONE);
        }
        if (ecoElementDto.getLat() == null){
            ecoElementDto.setLat(0.0);
        }
        if (ecoElementDto.getLon() == null){
            ecoElementDto.setLon(0.0);
        }

        return EcoElement.builder()
                .id(ecoElementId)
                .name(ecoElementDto.getName())
                .category(ecoElementDto.getCategory())
                .categorySub(ecoElementDto.getCategorySub())
                //the other attributes will be used later
                //.subtitle(ecoElementDto.getSubtitle())
                //.district(ecoElementDto.getDistrict())
                .address(ecoElementDto.getAddress())
                //.openingTimes(ecoElementDto.getOpeningTimes())
                //.adminNote(ecoElementDto.getAdminNote())
                //.url(ecoElementDto.getUrl())
                //.urlFacebook(ecoElementDto.getUrlFacebook())
                .isVisible(true)
                .isReviewed(existingEcoElement.getIsReviewed())
                .isShownOnMap(true)
                .isInBochum(true)
                .certificates(ecoElementDto.getCertificates())
                .creator(existingEcoElement.getCreator())
                .dateCreatedInternal(existingEcoElement.getDateCreatedInternal())
                .dateLastUpdatedInternal(timestampUtils.generateTimeStamp())
                .dateCreatedExternal(existingEcoElement.getDateCreatedExternal())
                .dateLastUpdatedExternal(timestampUtils.generateReadableDateStamp())
                .dateReviewedExternal(existingEcoElement.getDateReviewedExternal())
                .dateReviewedInternal(existingEcoElement.getDateReviewedInternal())
                .reviews(existingEcoElement.getReviews())
                .lon(ecoElementDto.getLon())
                .lat(ecoElementDto.getLat())
                .adminNote(existingEcoElement.getAdminNote())
                .build();
    }

    public EcoElement buildUpdatedEcoElementWithReview(ReviewDto reviewDto, EcoElement existingEcoElement,
                                                       String ecoElementId, Principal principal, Boolean deleteOldReview) {
        System.out.println(reviewDto.isPositive());

        Review newReview = Review.builder()
                .author(principal.getName())
                .positive(reviewDto.isPositive())
                .fromAdmin(false)
                .reviewComment(reviewDto.getReviewComment())
                .dateReviewedExternal(timestampUtils.generateReadableDateStamp())
                .dateReviewedInternal(timestampUtils.generateTimeStamp())
                .build();

        List<Review> newReviewList = existingEcoElement.getReviews();

        if (deleteOldReview){
            newReviewList = newReviewList.stream().filter((review) -> (!review.getAuthor()
                                    .equals(principal.getName()))).collect(Collectors.toList());
        }
        newReviewList.add(newReview);

        return EcoElement.builder()
                .id(ecoElementId)
                .name(existingEcoElement.getName())
                .category(existingEcoElement.getCategory())
                .categorySub(existingEcoElement.getCategorySub())
                //the other attributes will be used later
                //.subtitle(ecoElementDto.getSubtitle())
                //.district(ecoElementDto.getDistrict())
                .address(existingEcoElement.getAddress())
                //.openingTimes(ecoElementDto.getOpeningTimes())
                //.adminNote(ecoElementDto.getAdminNote())
                //.url(ecoElementDto.getUrl())
                //.urlFacebook(ecoElementDto.getUrlFacebook())
                .isVisible(existingEcoElement.getIsVisible())
                .isReviewed(existingEcoElement.getIsReviewed())
                .isShownOnMap(existingEcoElement.getIsShownOnMap())
                .isInBochum(existingEcoElement.getIsInBochum())
                .certificates(existingEcoElement.getCertificates())
                .creator(existingEcoElement.getCreator())
                .dateCreatedInternal(existingEcoElement.getDateCreatedInternal())
                .dateLastUpdatedInternal(timestampUtils.generateTimeStamp())
                .dateReviewedInternal(existingEcoElement.getDateReviewedInternal())
                .dateCreatedExternal(existingEcoElement.getDateCreatedExternal())
                .dateLastUpdatedExternal(timestampUtils.generateReadableDateStamp())
                .dateReviewedExternal(existingEcoElement.getDateReviewedExternal())
                .reviews(newReviewList)
                .lon(existingEcoElement.getLon())
                .lat(existingEcoElement.getLat())
                .build();


    }
}
