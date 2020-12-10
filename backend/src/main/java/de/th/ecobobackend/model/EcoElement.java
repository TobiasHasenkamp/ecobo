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
    private String id;
    private String name;
    private Category category;
    private CategorySub categorySub;
    private String subtitle;
    private String district;
    private String address;
    private String openingTimes;
    private String adminNote;
    private String url;
    private String urlFacebook;
    private Double lon;
    private Double lat;

    private Boolean isVisible;
    private Boolean isReviewed;
    private Boolean isShownOnMap;
    private Boolean isInBochum;

    private List<String> certificates;

    private String creator;

    private String dateCreatedExternal;
    private String dateLastUpdatedExternal;
    private String dateReviewedExternal;

    private Instant dateCreatedInternal;
    private Instant dateLastUpdatedInternal;
    private Instant dateReviewedInternal;

    private List<Review> reviews;

    private String pictureUrl;

}
