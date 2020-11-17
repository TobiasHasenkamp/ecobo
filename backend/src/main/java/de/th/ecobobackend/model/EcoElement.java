package de.th.ecobobackend.model;

import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="ecoElements")
public class EcoElement {

    @Id
    String id;
    String name;
    Category category;
    CategorySub categorySub;
    String subtitle;
    String district;
    String address;
    String openingTimes;
    String adminNote;
    String url;
    String urlFacebook;

    Boolean isVisible;
    Boolean isReviewed;
    Boolean isShownOnMap;
    Boolean isInBochum;

    Boolean certificate1;
    Boolean certificate2;

    String creator;
    Instant dateCreated;
    Instant dateLastUpdated;
    Instant dateReviewed;

    List<String> reviewComments;

}
