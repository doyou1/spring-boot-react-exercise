package com.example.backend;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class APIController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/join")
    public ResponseEntity<Boolean> join(@RequestBody User data, HttpServletRequest request) throws Exception {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findById(data.getId()));
        // 기존 DB에 동일 ID 존재여부 확인
        if(!userOptional.isPresent()) { // 동일 id 존재 X

            // js에서 날짜만을 가져오는 경우, default 시간은 09시, 당일 자정을 편지를 볼 수 있고, 볼 수 없는 분기점으로 잡을 것이기에, 시간을 바꿔줌
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd 00:00:00");
            Timestamp converted = Timestamp.valueOf(sdf.format(data.getTimestamp()));
            data.setTimestamp(converted);


            Optional<User> result = Optional.ofNullable(userRepository.save(data));

            if(result.isPresent()) {    // 성공했다면 _id가 추가된 Data present
                User user = new User();
                user.set_id(result.get().get_id());
                user.setId(result.get().getId());
                user.setNickname(result.get().getNickname());
                user.setTimestamp(result.get().getTimestamp());

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
                user.setTimestamp(userOptional.get().getTimestamp());

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

    @PostMapping("/getMessage")
    public ResponseEntity<List<Message>> getMessage(@RequestBody Long _id) {

        System.out.println("_id: " + _id);
        Optional<List<Message>> messagesOptional = Optional.ofNullable(messageRepository.findByReceiver_id(_id));

        if(messagesOptional.isPresent()) {
            System.out.println(messagesOptional.get().toString());
            return ResponseEntity.ok(messagesOptional.get());
        } else return ResponseEntity.ok(new ArrayList<>());

    }

    @PostMapping("/treeLink")
    public ResponseEntity<User> treeLink(@RequestBody Long _id, HttpServletRequest request) {
        Optional<User> userOptional = userRepository.findById(Long.valueOf(_id));

        if (userOptional.isPresent()) {
            User user = new User();
            user.setNickname(userOptional.get().getNickname());
            user.setId(userOptional.get().getId());
            user.set_id(userOptional.get().get_id());
            user.setTimestamp(userOptional.get().getTimestamp());
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.ok(new User());
    }

    @PostMapping("/send")
    public ResponseEntity<Boolean> send(@RequestBody Message data) {

        data.setTimestamp(new Timestamp(System.currentTimeMillis()));
        Optional<Message> result = Optional.ofNullable(messageRepository.save(data));

        if(result.isPresent()) {    // 성공했다면 _id가 추가된 Data present

            System.out.println(result.get().toString());

            return ResponseEntity.ok(true);
        } else return ResponseEntity.ok(false);


    }
}