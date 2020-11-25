package de.th.ecobobackend.mongoDB;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.model.enums.Category;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface EcoElementMongoDB extends PagingAndSortingRepository<EcoElement, String> {

    @Override
    List<EcoElement> findAll();

    Optional<EcoElement> findByName(String name);

    Optional<List<EcoElement>> findAllByCategory(Category category);


}
