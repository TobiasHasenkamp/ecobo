package de.th.ecobobackend.mongoDB;

import de.th.ecobobackend.model.UserProfile;
import org.apache.catalina.User;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface UserProfileMongoDB extends PagingAndSortingRepository<UserProfile, String> {

    @Override
    List<UserProfile> findAll();

    UserProfile findByActivationTokenEquals(String activationToken);
}
