package com.example.CustomerReachBackend.Service;

import com.example.CustomerReachBackend.Repository.UserRepo;
import com.example.CustomerReachBackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomerDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.getUserByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Could not found user!");
        }
        return new CustomerDetails(user);

    }
}
