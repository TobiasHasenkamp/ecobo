package de.th.ecobobackend.mongoDB;

import de.th.ecobobackend.model.UserProfile;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserProfileMongoDB extends PagingAndSortingRepository<UserProfile, String> {
}
