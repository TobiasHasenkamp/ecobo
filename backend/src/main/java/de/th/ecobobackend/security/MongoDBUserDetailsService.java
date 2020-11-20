package de.th.ecobobackend.security;

import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.mongoDB.UserProfileMongoDB;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MongoDBUserDetailsService implements UserDetailsService {

    private final UserProfileMongoDB userRepository;

    public MongoDBUserDetailsService(UserProfileMongoDB userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserProfile> userById = userRepository.findById(username);
        if (userById.isEmpty()){
            throw new UsernameNotFoundException("This Username doesn't exist.");
        }
        return new User(username, userById.get().getPassword(), List.of());
    }
}
