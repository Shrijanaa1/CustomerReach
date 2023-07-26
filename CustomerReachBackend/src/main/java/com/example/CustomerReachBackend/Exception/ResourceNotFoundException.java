package com.example.CustomerReachBackend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

//When the exception is thrown HTTP response status should be set to 404 Not Found.
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;
//    To verify that the sender and receiver of the serialized object have loaded classes for that object that are compatible with respect to serialization.

    public ResourceNotFoundException(String message){
        super(message);
    }
}
