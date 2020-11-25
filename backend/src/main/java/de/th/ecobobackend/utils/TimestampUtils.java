package de.th.ecobobackend.utils;

import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

@Service
public class TimestampUtils {

    public Instant generateTimeStamp() {
        return Instant.ofEpochSecond(Instant.now().getEpochSecond());
    }

    public String generateReadableDateStamp() {
        SimpleDateFormat dateWithTime = new SimpleDateFormat("dd.MM.yyyy");
        return dateWithTime.format(new Date());
    }
}
