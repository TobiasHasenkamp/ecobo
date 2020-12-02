package de.th.ecobobackend.model.dto;

import de.th.ecobobackend.model.enums.Category;
import de.th.ecobobackend.model.enums.CategorySub;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    List<String> certificates;
    Double lon;
    Double lat;
    String creator;
}
