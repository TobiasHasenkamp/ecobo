package de.th.ecobobackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    String author;
    boolean isPositive;
    boolean isFromAdmin;
    String dateReviewedExternal;
    Instant dateReviewedInternal;
    String reviewComment;
}
