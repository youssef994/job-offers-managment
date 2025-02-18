package com.example.eventservice.Service;

import com.example.eventservice.Entity.*;
import com.example.eventservice.Repository.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;



@Service
@AllArgsConstructor
public class EventService implements IEventService {
    EventRepository eventRepository;
    CrenoRepository crenoRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    IparticipantService participantService;
   // @Autowired
   // private JavaMailSender javaMailSender;

    @Scheduled(fixedDelay = 60000)
    public void fixedDelayMethod() {
        System.out.println("event scheduler working");
    }

   /* @Override
    public Event addEvent(Event e, int idUser) {

        User user = userRepository.findById(idUser).get();
        System.out.println(user);
        e.setUser(user);
        e.setState(state.PENDING);
        return eventRepository.save(e);
    }*/
    @Override
    public Event addEvent(Event e, int idUser){
        User u= userRepository.findById(idUser).get();
       // e.setUser(u);
        e.setState(state.PENDING);
        eventRepository.save(e);
        return e;


    }

    @Override
    public Event addEvent(Event e) {
        return eventRepository.save(e);
    }

    @Override
    public Event updateEvent(Event e) {
        return eventRepository.save(e);

    }

    @Override
    public List <Event> getAllEvents(){

        return eventRepository.findAll();
    }

    @Override
    public Optional<Event> getEvent(int id) {
        return eventRepository.findById(id);
    }

    @Override
    public void validateAdmin(int idEvent) {
        Event event = eventRepository.findById(idEvent).get();
        System.out.println("before" + event.getState());
        event.setState(state.VALIDATED);
        System.out.println("after" + event.getState());
        eventRepository.save(event);


    }


    @Override
    public void denyAdmin(int idEvent) {
        Event event = eventRepository.findById(idEvent).get();
        event.setState(state.DENIED);
        eventRepository.save(event);
    }

//    @Override
//    public void participateToEvent(int idUser, int idEvent) {
//        User idU = userRepository.findById(idUser).get();
//        Event idE = eventRepository.findById(idEvent).get();
//
//        assert idU != null;
//        idU.getEvent().add(idE);
//
//        assert idE != null;
//        idE.getParticipants().add(idU);
//
//        userRepository.save(idU);
//        eventRepository.save(idE);
//
//    }
    //dateFin

    @Override
    public List<User> getParticipants(int idUser) {
        return eventRepository.getAllusersByEvent(idUser);
    }

    @Override
    @Scheduled(fixedDelay = 60000)
    public String retrieveAndUpdatEventStatus() throws InterruptedException {
        List<Event> events = this.getAllEvents();
        Date today = java.sql.Date.valueOf(java.time.LocalDate.now());

        for (Event e : events) {
            if (e.getCrenos().size() == 0) continue;
            Set<Creno> op = e.getCrenos();
            Optional<Creno> cr = op.stream().findFirst();
            Creno c = cr.get();
            //Creno c = e.getCrenos().stream().findFirst().get();
            Date datefinC = c.getDateFin();
            Date dateDeb = c.getDateDebut();

            System.out.println("datefin" + datefinC.getTime());
            System.out.println("todauy" + today.getTime());
            long d =dateDeb.getTime() - today.getTime();
            System.out.println("d="+d);
           // System.out.println("before " + e.state);


            if (datefinC.getTime() - today.getTime() <  3600 * 24 * 1000) {

                e.setState(state.DONE);
             //   System.out.println("after"+ e.state);

                //e.setState(state.DONE);//b
                System.out.println("DONE ");
                eventRepository.save(e);

            }

            if (dateDeb.getTime() - today.getTime()  >3600 * 24 * 1000) {
                Optional<Event> ev = eventRepository.findById(e.getIdEvent());
                String nameEv = e.getName();


                List<participant> participants = participantService.getParticipantsByEvent(e.getIdEvent());
               // System.out.println(participants);
//mail sender
           /*     for (participant p : participants) {
                    User user = p.getUsersP();
                    String mailUser = user.getEmail();
                    SimpleMailMessage mailMessage = new SimpleMailMessage();
                    //mailMessage.setFrom(email);
                    // mailMessage.setTo(u);
                    // mailMessage.setSubject(e.get().getObjectif());

                    mailMessage.setTo(mailUser);
                    mailMessage.setText("dont forget to assist your event");
                    mailMessage.setSubject("you have an event tomorrow : " + nameEv);

                    javaMailSender.send(mailMessage);


                    eventRepository.save(e);
                }*/
            }
        }
            return null;
    }

}
