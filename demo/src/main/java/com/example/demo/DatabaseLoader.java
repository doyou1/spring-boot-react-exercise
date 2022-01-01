package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component  // (1)
public class DatabaseLoader implements CommandLineRunner{   // (2)
    
    private final EmployeeRepository repository;

    @Autowired  // (3)
    public DatabaseLoader(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {   // (4)
        
        this.repository.save(new Employee("Frodo", "Baggins", "ring bearer"));
        this.repository.save(new Employee("Bilbo", "Baggins", "burglar"));
        this.repository.save(new Employee("Gandalf", "the Grey", "wizard"));
        this.repository.save(new Employee("Samwise", "Gamgee", "gardener"));
        this.repository.save(new Employee("Meriadoc", "Brandybuck", "pony rider"));
        this.repository.save(new Employee("Peregrin", "Took", "pipe smoker"));

    }
}
