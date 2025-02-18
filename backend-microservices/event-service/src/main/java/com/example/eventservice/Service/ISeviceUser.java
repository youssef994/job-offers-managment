package com.example.eventservice.Service;

import com.example.eventservice.Entity.User;
import java.util.List;


public interface ISeviceUser {
    List<User> retrieveAllUsers();

    User addUser (User u);

    User updateUser (User u);

    User retrieveUser(Integer idUser);

    void removeUser(Integer idUser);
}
