package de.th.ecobobackend.service;

import de.th.ecobobackend.model.EcoElement;
import de.th.ecobobackend.mongoDB.EcoElementMongoDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.util.BsonUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ActiveDistrictService {

    private final EcoElementMongoDB ecoElementMongoDB;

    @Autowired
    public ActiveDistrictService(EcoElementMongoDB ecoElementMongoDB){
        this.ecoElementMongoDB = ecoElementMongoDB;
    }

    public List<String> getListOfActiveDistricts(){

        List<EcoElement> ecoElementList = ecoElementMongoDB.findAll();
        List<String> districtList = new ArrayList<>();

        for (EcoElement ecoElement : ecoElementList){
            if (!districtList.contains(ecoElement.getDistrict())){
                if (ecoElement.getDistrict() != null){
                    districtList.add(ecoElement.getDistrict());
                }
            }
        }

        Collections.sort(districtList);

        return districtList;
    }


}
