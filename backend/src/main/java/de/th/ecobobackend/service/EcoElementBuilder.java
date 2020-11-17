package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.utils.IDUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EcoElementBuilder {

    private final IDUtils idUtils;

    public EcoElementBuilder(IDUtils idUtils) {
        this.idUtils = idUtils;
    }

    public EcoElement build(){
        return EcoElement.builder()
                .id(idUtils.generateID())
                .name("name")
                .category("category")
                .categorySub("categorySub")
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
                .dateCreated("testDate")
                .dateLastUpdated("testDate2")
                .dateReviewed("testDate3")
                .reviewComments(List.of())
                .build();
    }

    public EcoElement buildRandomElement(){
        return EcoElement.builder()
                .id(idUtils.generateID())
                .name("name")
                .category("categoryRandom")
                .categorySub("categorySub")
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
                .dateCreated("testDate")
                .dateLastUpdated("testDate2")
                .dateReviewed("testDate3")
                .reviewComments(List.of())
                .build();
    }




}
