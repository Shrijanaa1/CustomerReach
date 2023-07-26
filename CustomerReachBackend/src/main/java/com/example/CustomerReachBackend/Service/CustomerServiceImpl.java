package com.example.CustomerReachBackend.Service;

import com.example.CustomerReachBackend.Exception.ResourceNotFoundException;
import com.example.CustomerReachBackend.Repository.CustomerRepo;
import com.example.CustomerReachBackend.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    CustomerRepo customerRepo;

    @Override
    public List<Customer> getAllCustomer() {
        List<Customer> allCustomers = customerRepo.findAll();
        return allCustomers;
    }

    @Override
    public Customer addCustomer(Customer customer) {
        return customerRepo.save(customer);
    }

    @Override
    public Customer getCustomerById(Long id) {
        return customerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer doesn't exist with id: " + id));
    }

    @Override
    public Customer updateCustomerById(Long id, Customer customer) {
        Customer originalCustomer = customerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id:" + id));
        if(originalCustomer != null){
            originalCustomer.setUsername(customer.getUsername());
            originalCustomer.setEmail(customer.getEmail());
            originalCustomer.setPassword(customer.getPassword());
            originalCustomer.setAddress(customer.getAddress());
            originalCustomer.setContact(customer.getContact());
            return customerRepo.save(originalCustomer);
        }
        return null;
    }


    @Override
    public void deleteCustomerById(Long id) {
        Customer customer = customerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer does not exist with id: " + id));

        customerRepo.delete(customer);
    }

}
