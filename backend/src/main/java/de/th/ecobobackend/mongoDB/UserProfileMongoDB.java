package de.th.ecobobackend.mongoDB;

import de.th.ecobobackend.model.UserProfile;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface UserProfileMongoDB extends PagingAndSortingRepository<UserProfile, String> {

    @Override
    List<UserProfile> findAll();
}
