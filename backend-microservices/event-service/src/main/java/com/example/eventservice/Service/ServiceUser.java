package com.example.eventservice.Service;

import com.example.eventservice.Entity.User;
import com.example.eventservice.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ServiceUser implements ISeviceUser {

    @Autowired
    UserRepository userRepository;
    @Override
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User addUser(User u) {
        return userRepository.save(u);
    }

    @Override
    public User updateUser(User u) {
        return userRepository.save(u);
    }

    @Override
    public User retrieveUser(Integer idUser) {
        return userRepository.findById(idUser).get();
    }

    @Override
    public void removeUser(Integer idUser) {
        userRepository.deleteById(idUser);
    }


}
