package com.example.eventservice.Controller;

import com.example.eventservice.Entity.Event;
import com.example.eventservice.Entity.User;
import com.example.eventservice.Repository.EventRepository;
import com.example.eventservice.Service.IEventService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("event")
public class EventController {
    private IEventService iEventService;
  //  @Autowired
  //  private IEmailService emailService;
    @Autowired
    private EventRepository eventRepository;


    @GetMapping("get-events")
    public ResponseEntity getAllEvents() {
        List<Event> allEvents = iEventService.getAllEvents();
        return new ResponseEntity<>(allEvents, HttpStatus.CREATED);
    }


    @GetMapping("get-event/{id}")
    public ResponseEntity getEvent(@PathVariable int id) {
        Optional<Event> event = iEventService.getEvent(id);
        return new ResponseEntity<>(event, HttpStatus.CREATED);

    }


    @PostMapping("addevent/{id}")
    public Event addEvent(@PathVariable int id, @RequestBody Event e) {
        System.out.println(e);
        iEventService.addEvent(e,id);

        return e;

    }

    @PutMapping("validate/{idEvent}")
    public void deny(@PathVariable int idEvent) {
        System.out.println("ID" + idEvent);
        iEventService.validateAdmin(idEvent);
    }

    @PutMapping("deny/{idEvent}")
    public void validate(@PathVariable int idEvent) {
        System.out.println("ID" + idEvent);
        iEventService.denyAdmin(idEvent);
    }


  /*  @PostMapping("sendMail/{iduser}")
    public String sendMail(@PathVariable int iduser, @RequestBody EmailDetails details) {
        String status = emailService.sendSimpleMail(iduser, details);
        return status; }*/


/*    @PostMapping("participate/{iduser}/{idEvent}")
    @ResponseBody
    public boolean AffecteEtudiant(@PathVariable("iduser") Integer iduser, @PathVariable("idEvent") Integer idEvent) {
        iEventService.participateToEvent(iduser, idEvent);
        return true;
    }*/

    @GetMapping("getParticipants/{idUser}")
    public List<User> getParticipants(@PathVariable int idUser) {
        return eventRepository.getAllusersByEvent(idUser);
    }



}
