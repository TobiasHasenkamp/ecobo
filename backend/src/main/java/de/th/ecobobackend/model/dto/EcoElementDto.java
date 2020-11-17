package de.th.ecobobackend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EcoElementDto {

    String name;
    String category;
    String categorySub;
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
}
