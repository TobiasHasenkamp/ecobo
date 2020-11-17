package de.th.ecobobackend.utils;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IDUtils {

    public String generateID() {
        return UUID.randomUUID().toString();
    }

}
