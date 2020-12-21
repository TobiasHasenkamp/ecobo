package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.Review;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.dto.ReviewDto;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.apache.commons.compress.utils.Lists;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.security.Principal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ActiveDistrictServiceTest {

    final EcoElementMongoDB ecoElementMongoDB = mock(EcoElementMongoDB.class);
    final ActiveDistrictService activeDistrictService = new ActiveDistrictService(ecoElementMongoDB);

    //Given for all Tests
    EcoElement exampleEcoElement1 = EcoElement.builder()
            .id("123")
            .name("Bioladen")
            .category(Category.FOODSTORE)
            .categorySub(CategorySub.FOODSTORE_NORMAL)
            .subtitle("")
            .district("Innenstadt")
            .address("")
            .openingTimes("")
            .adminNote("")
            .url("")
            .creator("Tobias")
            .urlFacebook("")
            .isInBochum(true)
            .certificates(List.of("Veganes Angebot"))
            .reviews(List.of())
            .lon(1.0)
            .lat(1.0)
            .dateCreatedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .build();

    EcoElement exampleEcoElement2 = EcoElement.builder()
            .id("1234")
            .name("Bioladen2")
            .category(Category.FOODSTORE)
            .categorySub(CategorySub.FOODSTORE_NORMAL)
            .subtitle("")
            .district("Riemke")
            .address("")
            .openingTimes("")
            .adminNote("")
            .url("")
            .creator("Tobias")
            .urlFacebook("")
            .isInBochum(true)
            .certificates(List.of("Veganes Angebot"))
            .reviews(List.of())
            .lon(1.0)
            .lat(1.0)
            .dateCreatedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .build();

    EcoElement exampleEcoElement3 = EcoElement.builder()
            .id("12345")
            .name("Bioladen")
            .category(Category.FOODSTORE)
            .categorySub(CategorySub.FOODSTORE_NORMAL)
            .subtitle("")
            .district("Langendreer")
            .address("")
            .openingTimes("")
            .adminNote("")
            .url("")
            .creator("Tobias")
            .urlFacebook("")
            .isInBochum(true)
            .certificates(List.of("Veganes Angebot"))
            .reviews(List.of())
            .lon(1.0)
            .lat(1.0)
            .dateCreatedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .build();

    List<EcoElement> ecoElementList = List.of(exampleEcoElement1, exampleEcoElement2, exampleEcoElement3);

    @Test
    @DisplayName("The getListOfActiveDistricts method return the three active districts")
    void buildShouldBuildCorrectEcoElement() {
        //When
        when(ecoElementMongoDB.findAll()).thenReturn(ecoElementList);
        List<String> resultingDistricts = activeDistrictService.getListOfActiveDistricts();

        //Then
        assertThat(resultingDistricts, is(List.of("Innenstadt", "Langendreer", "Riemke")));
    }

}