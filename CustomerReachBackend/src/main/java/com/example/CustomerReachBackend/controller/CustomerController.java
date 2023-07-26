package com.example.CustomerReachBackend.controller;

import com.example.CustomerReachBackend.Service.CustomerService;
import com.example.CustomerReachBackend.model.Customer;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    //    get all employees
    @GetMapping("/getCustomers")
    public ResponseEntity<List<Customer>> getAllCustomer() {
        List<Customer> customers = customerService.getAllCustomer();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }


    //crate/add new employee
    @PostMapping("/addCustomers")
    public ResponseEntity<Customer> addCustomer(@Valid @RequestBody Customer customer) {
        // If the customer entity fails validation, Spring will automatically return
        // a 400 Bad Request response with validation error details.
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        Customer addCustomer = customerService.addCustomer(customer);
        return new ResponseEntity<>(addCustomer, HttpStatus.CREATED);
    }


    //get customer by ID
    @GetMapping("/getCustomer/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable("id") Long id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateCustomer/{id}")
    public ResponseEntity<Customer> updateCustomerById(@PathVariable Long id, @Valid @RequestBody Customer customer) {
        Customer updatedCustomer = customerService.updateCustomerById(id, customer);

        if (updatedCustomer != null) {
            return ResponseEntity.ok(updatedCustomer);
        } else {
            return ResponseEntity.notFound().build(); //build returns empty response body
        }
    }

    //    //delete customer by ID

    @DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCustomerById(@PathVariable("id") Long id) {
        customerService.deleteCustomerById(id);

        //This line creates a Map object called response, which will be used to construct the response body of the HTTP response.
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }
}
