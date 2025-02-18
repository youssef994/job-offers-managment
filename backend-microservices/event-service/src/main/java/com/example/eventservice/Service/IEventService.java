package com.example.eventservice.Service;

import com.example.eventservice.Entity.*;

import java.util.List;
import java.util.Optional;

public interface IEventService {

    /* @Override
     public Event addEvent(Event e, int idUser) {

         User user = userRepository.findById(idUser).get();
         System.out.println(user);
         e.setUser(user);
         e.setState(state.PENDING);
         return eventRepository.save(e);
     }*/
    Event addEvent(Event e, int idUser);

    Event addEvent(Event e);

    public Event updateEvent(Event e);

    List<Event> getAllEvents();

    Optional<Event> getEvent(int id);

    void validateAdmin(int idEvent);

    void denyAdmin(int idEvent);

//    void participateToEvent(int idUser,int idEvent);

    List<User> getParticipants(int idUser);


     String retrieveAndUpdatEventStatus() throws InterruptedException;
}

