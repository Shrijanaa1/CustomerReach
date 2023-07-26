package com.example.CustomerReachBackend.Repository;

import com.example.CustomerReachBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.name = :name")
    public User getUserByUsername(@Param("name") String name);

//    User getUserByUsername(String username);

    boolean existsByName(String name);
}
