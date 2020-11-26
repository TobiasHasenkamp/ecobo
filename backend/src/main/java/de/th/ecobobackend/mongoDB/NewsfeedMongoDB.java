package de.th.ecobobackend.mongoDB;

import de.th.ecobobackend.model.NewsfeedElement;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface NewsfeedMongoDB extends PagingAndSortingRepository<NewsfeedElement, String> {

    @Override
    List<NewsfeedElement> findAll();

}
