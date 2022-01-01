package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner{
    
    private final EmployeeRepository employees;
    private final ManagerRepository managers;

    @Autowired
    public DatabaseLoader(EmployeeRepository employeeRepository, ManagerRepository managerRepository) {
        this.employees = employeeRepository;
        this.managers = managerRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        
        Manager jh = this.managers.save(new Manager("jh", "sim", "ROLE_MANAGER"));
        Manager oliver = this.managers.save(new Manager("oliver", "gierke", "ROLE_MANAGER"));

        SecurityContextHolder.getContext().setAuthentication(
            new UsernamePasswordAuthenticationToken(
                "jh",
                "doesn't matter",
                AuthorityUtils.createAuthorityList("ROLE_MANAGER")
            )
        );

        this.employees.save(new Employee("Frodo", "Baggins", "ring bearer", jh));
        this.employees.save(new Employee("Bilbo", "Baggins", "burglar", jh));
        this.employees.save(new Employee("Gandalf", "the Grey", "wizard", jh));

        SecurityContextHolder.getContext().setAuthentication(
            new UsernamePasswordAuthenticationToken(
                "oliver",
                "doesn't matter",
                AuthorityUtils.createAuthorityList("ROLE_MANAGER")
                )
        );
        this.employees.save(new Employee("Samwise", "Gamgee", "gardener", oliver));
        this.employees.save(new Employee("Meriadoc", "Brandybuck", "pony rider", oliver));
        this.employees.save(new Employee("Peregrin", "Took", "pipe smoker", oliver));

        SecurityContextHolder.clearContext();
    }
}
