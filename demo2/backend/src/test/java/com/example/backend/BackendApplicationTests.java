package com.example.backend;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class BackendApplicationTests {


	@Autowired
    private UserRepository userRepository;


	@Test
	void contextLoads() {

		System.out.println("contextLoads");
	}


	@Test
    public void read() {
        List<User> users = userRepository.findAll();

		System.out.println("테스트중");
        System.out.println(users.toString());
    }
}
