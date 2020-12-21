package de.th.ecobobackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user")
@Builder
public class UserProfile {

    @Id
    private String username;
    private String password;
    private Instant registrationDateInternal;
    private String registrationDateExternal;
    private String profilePic;
    private String email;
    private boolean activated;
    private String activationToken;
}
