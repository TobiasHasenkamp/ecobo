package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public class EcoElementSeeder {

    final IDUtils idUtils = new IDUtils();
    final TimestampUtils timestampUtils = new TimestampUtils();
    EcoElementBuilder ecoElementBuilder = new EcoElementBuilder(idUtils, timestampUtils);

    public List<EcoElement> get4RandomEcoElementsForTesting(){
        EcoElement ecoElement1 = ecoElementBuilder.buildRandomElement();
        EcoElement ecoElement2 = ecoElementBuilder.buildRandomElement();
        EcoElement ecoElement3 = ecoElementBuilder.buildRandomElement();
        EcoElement ecoElement4 = ecoElementBuilder.buildRandomElement();
        return List.of(ecoElement1, ecoElement2, ecoElement3, ecoElement4);
    }

    public Optional<EcoElement> get1HardcodedEcoElementForTesting(){

        String inputDate = "2020-11-17T10:51:00Z";
        Instant inputDateAsInstant = Instant.parse(inputDate);

        EcoElement result = EcoElement.builder()
                .id("123")
                .name("TestElement")
                .category(Category.BIOLADEN)
                .categorySub(CategorySub.BIOSUPERMARKT)
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
                .dateCreated(inputDateAsInstant)
                .dateLastUpdated(inputDateAsInstant)
                .dateReviewed(inputDateAsInstant)
                .reviewComments(List.of())
                .build();

        return Optional.of(result);
    }

}
