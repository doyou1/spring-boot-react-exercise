package com.example.backend;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class APIController {

    @Autowired
    private UserRepository userRepository;

//    @RequestMapping("/ip")
//    public ResponseEntity<String> ip(HttpServletRequest request) {
//
//        // 요청을 보낸 클라이언트의 IP주소 반환
//        return ResponseEntity.ok(request.getRemoteAddr());
//    }


    @RequestMapping("/getUsers")
    public ResponseEntity<List<User>> getUsers(HttpServletRequest request) {

        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody User user) {

        return ResponseEntity.ok("join");
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody User data, HttpServletRequest request) {

        Optional<User> userOptional = Optional.ofNullable(userRepository.findById(data.getId()));

        // id 동일여부 확인
        if(userOptional.isPresent()) {
            // password 동일여부 확인
            if(userOptional.get().getPassword().equals(data.getPassword())) {
                User user = new User();
                user.setId(userOptional.get().getId());
                user.setNickname(userOptional.get().getNickname());

                HttpSession session = request.getSession();
                session.setAttribute("currentUser", user);

                return ResponseEntity.ok(true);
            } else return ResponseEntity.ok(false);
        } else return ResponseEntity.ok(false);
    }

    @PostMapping("/currentUser")
    public ResponseEntity<User> currentUser(HttpServletRequest request) {

        HttpSession session = request.getSession();
        Optional<User> userOptional = Optional.ofNullable((User) session.getAttribute("currentUser"));

        // 세션에 저장된 값 존재여부 확인
        if(userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.ok(new User());
        }
    }
}