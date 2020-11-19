package de.th.ecobobackend.model.dto;

import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EcoElementDto {

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
    Boolean isInBochum;
    Boolean certificate1;
    Boolean certificate2;
    String lon;
    String lat;
}
