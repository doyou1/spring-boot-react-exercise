package com.example.backend;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class IPController {
    
    @RequestMapping("/ip")
    public ResponseEntity<String> ip(HttpServletRequest request) {

        // 요청을 보낸 클라이언트의 IP주소 반환
        return ResponseEntity.ok(request.getRemoteAddr());
    }
}
