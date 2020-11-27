package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.springframework.stereotype.Service;

import java.util.List;

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
                .isReviewed(true)
                .isShownOnMap(true)
                .isInBochum(true)
                //.certificate1(ecoElementDto.getCertificate1())
                //.certificate2(ecoElementDto.getCertificate2())
                .creator(ecoElementDto.getCreator())
                .dateCreatedInternal(timestampUtils.generateTimeStamp())
                .dateLastUpdatedInternal(timestampUtils.generateTimeStamp())
                .dateReviewedInternal(null)
                .dateCreatedExternal(timestampUtils.generateReadableDateStamp())
                .dateLastUpdatedExternal(timestampUtils.generateReadableDateStamp())
                .dateReviewedExternal("")
                .reviewComments(List.of())
                .lon(ecoElementDto.getLon())
                .lat(ecoElementDto.getLat())
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
                .certificate1(true)
                .certificate2(true)
                .creator("Tobias")
                .dateCreatedInternal(timestampUtils.generateTimeStamp())
                .dateLastUpdatedInternal(timestampUtils.generateTimeStamp())
                .dateReviewedInternal(null)
                .dateCreatedExternal(timestampUtils.generateReadableDateStamp())
                .dateReviewedExternal(timestampUtils.generateReadableDateStamp())
                .dateReviewedExternal("")
                .reviewComments(List.of())
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
                .isReviewed(true)
                .isShownOnMap(true)
                .isInBochum(true)
                //.certificate1(ecoElementDto.getCertificate1())
                //.certificate2(ecoElementDto.getCertificate2())
                .creator(existingEcoElement.getCreator())
                .dateCreatedInternal(existingEcoElement.getDateCreatedInternal())
                .dateLastUpdatedInternal(timestampUtils.generateTimeStamp())
                .dateReviewedInternal(null)
                .dateCreatedExternal(existingEcoElement.getDateCreatedExternal())
                .dateLastUpdatedExternal(timestampUtils.generateReadableDateStamp())
                .dateReviewedExternal("")
                .reviewComments(List.of())
                .lon(ecoElementDto.getLon())
                .lat(ecoElementDto.getLat())
                .build();
    }
}
