package com.example.backend;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class APIController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/join")
    public ResponseEntity<Boolean> join(@RequestBody User data, HttpServletRequest request) throws Exception {

        Optional<User> userOptional = Optional.ofNullable(userRepository.findById(data.getId()));

        // 기존 DB에 동일 ID 존재여부 확인
        if(!userOptional.isPresent()) { // 동일 id 존재 X

            Optional<User> result = Optional.ofNullable(userRepository.save(data));

            if(result.isPresent()) {    // 성공했다면 _id가 추가된 Data present

                User user = new User();
                user.set_id(result.get().get_id());
                user.setId(result.get().getId());
                user.setNickname(result.get().getNickname());

                HttpSession session = request.getSession();
                session.setAttribute("currentUser", user);

                return ResponseEntity.ok(true);
            }

        } else {

            return ResponseEntity.ok(false);
        }

        return ResponseEntity.ok(false);
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody User data, HttpServletRequest request) {

        Optional<User> userOptional = Optional.ofNullable(userRepository.findById(data.getId()));

        // id 동일여부 확인
        if(userOptional.isPresent()) {
            // password 동일여부 확인
            if(userOptional.get().getPassword().equals(data.getPassword())) {
                User user = new User();
                user.set_id(userOptional.get().get_id());
                user.setId(userOptional.get().getId());
                user.setNickname(userOptional.get().getNickname());

                HttpSession session = request.getSession();
                session.setAttribute("currentUser", user);

                return ResponseEntity.ok(true);
            } else return ResponseEntity.ok(false);
        } else return ResponseEntity.ok(false);
    }

    @GetMapping("/logout")
    public ResponseEntity<Boolean> logout(HttpServletRequest request) throws Exception {
        HttpSession session = request.getSession();
        session.removeAttribute("currentUser");

        return ResponseEntity.ok(true);
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

    @PostMapping("/treeLink")
    public ResponseEntity<User> treeLink(@RequestBody Long _id, HttpServletRequest request) {

        Optional<User> userOptional = userRepository.findById(Long.valueOf(_id));

        if (userOptional.isPresent()) {
            User user = new User();
            user.setNickname(userOptional.get().getNickname());
            user.setId(userOptional.get().getId());
            user.set_id(userOptional.get().get_id());

            return ResponseEntity.ok(user);
        }

        return ResponseEntity.ok(new User());
    }
}