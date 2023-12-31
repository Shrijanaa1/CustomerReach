package com.example.CustomerReachBackend.Repository;

import com.example.CustomerReachBackend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {
    @Query("SELECT c FROM Customer c WHERE c.username = :username")
    public Customer getCustomerByUsername(@Param("username") String username);

//    Customer getUserByUsername(String username);
}
