package de.th.ecobobackend.model;

import de.th.ecobobackend.model.enums.NewsfeedType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "newsfeed")
public class NewsfeedElement {

    @Id
    private String id;
    private NewsfeedType type;
    private String message;
    private long number;
    private String dateExternal;
    private Instant dateInternal;
    private String linkedElement;
}
