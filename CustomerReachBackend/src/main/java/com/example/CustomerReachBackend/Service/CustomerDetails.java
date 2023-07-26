package com.example.CustomerReachBackend.Service;

import com.example.CustomerReachBackend.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

public class CustomerDetails implements UserDetails {

    private User user;

    public CustomerDetails(User user){
        this.user = user;
    }

    //Returns the authorities granted to the user
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(user.getRole());
        return Arrays.asList(simpleGrantedAuthority);
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    //Returns the username used to authenticate the user. Cannot return null.
    @Override
    public String getUsername() {
        return user.getName();
    }

    //true if the user's account is valid (ie non-expired), false if no longer valid (ie expired)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //    Indicates whether the user is locked or unlocked. A locked user cannot be authenticated.
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    //    Indicates whether the user's credentials (password) has expired. Expired credentials prevent authentication.
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //    Indicates whether the user is enabled or disabled. A disabled user cannot be authenticated.
    @Override
    public boolean isEnabled() {
        return true;
    }
}
