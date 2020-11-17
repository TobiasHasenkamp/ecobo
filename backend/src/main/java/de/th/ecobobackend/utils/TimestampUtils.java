package de.th.ecobobackend.utils;

import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class TimestampUtils {

    public Instant generateTimeStamp() {
        return Instant.ofEpochSecond(Instant.now().getEpochSecond());
    }

}
