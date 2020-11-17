package de.th.ecobobackend.mongoDB;

import de.th.ecobobackend.model.EcoElement;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface EcoElementMongoDB extends PagingAndSortingRepository<EcoElement, String> {

    @Override
    List<EcoElement> findAll();

    @Override
    List<EcoElement> findAll(Sort sort);
}
