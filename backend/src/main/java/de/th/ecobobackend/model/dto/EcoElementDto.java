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
    private Boolean isInBochum;
    private List<String> certificates;
    private Double lon;
    private Double lat;
    private String creator;
}
