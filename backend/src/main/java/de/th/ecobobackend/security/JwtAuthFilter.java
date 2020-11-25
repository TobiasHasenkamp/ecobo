package de.th.ecobobackend.security;

import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Service
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    public JwtAuthFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        //later rewrite this section so that it only is active on certain requests and else returns true
        //is this really the way this works btw? should the JwtAuthFilter really block requests that are not allowed, should this filter not just forward to the main filter?

        if (request.getServletPath().matches("/auth/login")){
            return true;
        }
        if (request.getServletPath().contains("/acc/userdata")){
            return true;
        }
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {

        //get token
        String authorization = httpServletRequest.getHeader("Authorization");
        if(authorization == null || authorization.isBlank()){
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            System.out.println("login was unsuccessful.");
            return;
        }

        //validate token
        String token = authorization.replace("Bearer", "").trim();
        try {
            Claims claims = jwtUtils.parseToken(token);
            if(!jwtUtils.isExpired(claims)){
                SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                        claims.getSubject(),
                        "",
                        Collections.emptyList()
                ));
                System.out.println("Login was successful.");
            }
        } catch (Exception e){
            System.out.println(e);
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }
}
