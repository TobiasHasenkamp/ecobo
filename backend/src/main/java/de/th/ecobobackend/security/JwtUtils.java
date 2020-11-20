package de.th.ecobobackend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import io.jsonwebtoken.Jwts;

@Service
public class JwtUtils {

    //entspricht der Enviromentvariablen $JWT_SECRETKEY
    @Value("${jwt.secretkey}")
    private String key;

    public String createToken(Map<String, Object> claims, String username){
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofHours(2)))) //expires in 2 Hours
                .signWith(SignatureAlgorithm.HS512,key) //sign token with algorithm and key
                .compact();
    }

    public Claims parseToken(String token){
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }

    public boolean isExpired(Claims claims){
        return claims.getExpiration().before(new Date());
    }

}
