package de.th.ecobobackend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.TestPropertySource;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "jwt.secretkey=12345678910",
        "aws.accesskey=12345678910",
        "aws.secretkey=12345678910"
})

class JwtAuthFilterTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private final String secretKey = "12345678910";

    @Test
    public void simpleRequestShouldReturnHttpStatusOK(){
        //GIVEN
        String token = Jwts.builder()
                .setClaims(new HashMap<>())
                .setSubject("Tobias")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofHours(2))))
                .signWith(SignatureAlgorithm.HS512,secretKey)
                .compact();

        //WHEN
        String url = "http://localhost:" + port + "/api/elements";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

    @Test
    public void simpleRequestShouldNotReturnForbiddenEvenIfTokenHasExpired1(){
        //GIVEN
        String token = Jwts.builder()
                .setClaims(new HashMap<>())
                .setSubject("Tobias")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().minus(Duration.ofMinutes(2))))
                .signWith(SignatureAlgorithm.HS512,secretKey)
                .compact();

        //WHEN
        String url = "http://localhost:" + port + "/api/elements";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

    @Test
    public void simpleRequestShouldNotReturnForbiddenEvenIfTokenHasExpired2(){
        //GIVEN
        String token = Jwts.builder()
                .setClaims(new HashMap<>())
                .setSubject("Tobias")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().minus(Duration.ofMinutes(2))))
                .signWith(SignatureAlgorithm.HS512,secretKey)
                .compact();

        //WHEN
        String url = "http://localhost:" + port + "/api/newsfeed";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

    @Test
    public void protectedRequestShouldReturnForbiddenIfTokenHasExpired(){
        //GIVEN
        String token = Jwts.builder()
                .setClaims(new HashMap<>())
                .setSubject("Tobias")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().minus(Duration.ofMinutes(2))))
                .signWith(SignatureAlgorithm.HS512,secretKey)
                .compact();

        //WHEN
        String url = "http://localhost:" + port + "/api/elements/protected";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

    @Test
    public void simpleRequestShouldNotReturnForbiddenEvenIfSecretKeyDoesNotMatch(){
        //GIVEN
        String token = Jwts.builder()
                .setClaims(new HashMap<>())
                .setSubject("Tobias")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofMinutes(10))))
                .signWith(SignatureAlgorithm.HS512,secretKey + 2)
                .compact();

        //WHEN
        String url = "http://localhost:" + port + "/api/elements";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

    @Test
    public void protectedRequestShouldReturnForbiddenIfSecretKeyDoesNotMatch(){
        //GIVEN
        String token = Jwts.builder()
                .setClaims(new HashMap<>())
                .setSubject("Tobias")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofMinutes(10))))
                .signWith(SignatureAlgorithm.HS512,secretKey + 2)
                .compact();

        //WHEN
        String url = "http://localhost:" + port + "/api/elements/protected";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

}