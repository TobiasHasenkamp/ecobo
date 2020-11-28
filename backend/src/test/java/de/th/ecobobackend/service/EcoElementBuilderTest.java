package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.dto.EcoElementDto;
import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import de.th.ecobobackend.utils.IDUtils;
import de.th.ecobobackend.utils.TimestampUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.hamcrest.Matchers.*;
import static org.hamcrest.MatcherAssert.*;

class EcoElementBuilderTest {

    final IDUtils idUtils = new IDUtils();
    final TimestampUtils timestampUtils = new TimestampUtils();
    final EcoElementBuilder ecoElementBuilder = new EcoElementBuilder(idUtils, timestampUtils);

    //Given for all Tests
    Instant inputDateAsInstant = Instant.ofEpochSecond(Instant.now().getEpochSecond());

    EcoElementDto incomingEcoElementDto = new EcoElementDto("Bioladen", Category.FOODSTORE, CategorySub.FOODSTORE_NORMAL,
            "", "", "", "", "", "", "", true,
            false, false, 1.0, 1.0, "Testperson");

    EcoElement expectedEcoElement = EcoElement.builder()
            .id("123")
            .name("Bioladen")
            .category(Category.FOODSTORE)
            .categorySub(CategorySub.FOODSTORE_NORMAL)
            .subtitle("")
            .district("")
            .address("")
            .openingTimes("")
            .adminNote("")
            .url("")
            .creator("Tobias")
            .urlFacebook("")
            .isInBochum(true)
            .certificate1(false)
            .certificate2(false)
            .lon(1.0)
            .lat(1.0)
            .dateCreatedInternal(Instant.ofEpochSecond(Instant.now().getEpochSecond()))
            .build();

    @Test
    @DisplayName("The build method should build an EcoElement corresponding to the DtoElement it was called with")
    void buildShouldBuildCorrectEcoElement() {
        //When
        EcoElement receivedEcoElement = ecoElementBuilder.build(incomingEcoElementDto, "123");

        //Then
        assertThat(receivedEcoElement.getName(), is(expectedEcoElement.getName()));
        assertThat(receivedEcoElement.getCreator(), is(expectedEcoElement.getCreator()));
        assertThat(receivedEcoElement.getCategory(), is(expectedEcoElement.getCategory()));
        assertThat(receivedEcoElement.getCategorySub(), is(expectedEcoElement.getCategorySub()));
        assertThat(receivedEcoElement.getAddress(), is(expectedEcoElement.getAddress()));
        assertThat(receivedEcoElement.getIsInBochum(), is(expectedEcoElement.getIsInBochum()));
        assertThat(receivedEcoElement.getLon(), is(expectedEcoElement.getLon()));
        assertThat(receivedEcoElement.getLat(), is(expectedEcoElement.getLat()));
        assertThat(receivedEcoElement.getId().length(), is(36));
        assertThat(receivedEcoElement.getDateCreatedInternal(), is(inputDateAsInstant));
    }

}