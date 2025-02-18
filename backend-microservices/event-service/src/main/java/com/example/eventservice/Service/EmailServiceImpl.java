package com.example.eventservice.Service;
import com.example.eventservice.Repository.EventRepository;
import com.example.eventservice.Repository.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmailServiceImpl implements IEmailService {
  //  @Autowired
   // private JavaMailSender javaMailSender;
    private UserRepository user;
    @Value("${spring.mail.username}")
    private String sender;
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private IparticipantService iparticipantService;

       /* @Scheduled(fixedDelay = 60000)
    public void fixedDelayMethod() {
        System.out.println("event scheduler working");
    }*/
   /* @Override
    //@Scheduled(fixedDelay = 60000)
    public String sendSimpleMail(int idEvent, EmailDetails details) {

         //   List<User> u = eventService.findUserByEvent(idUser);
          //  System.out.println(u);
        Optional<Event> e= eventRepository.findById(idEvent);
        String nameEv = e.get().getName();

        List<participant> participants = iparticipantService.getParticipantsByEvent(idEvent);
         System.out.println(participants);

        for (participant p : participants){
            User user= p.getUsersP();
            String mailUser= user.getEmail();
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            //mailMessage.setFrom(email);
           // mailMessage.setTo(u);
           // mailMessage.setSubject(e.get().getObjectif());

            mailMessage.setTo(mailUser);
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject("you have an event tomorrow : " + nameEv);

            javaMailSender.send(mailMessage);

            return "Mail Sent Successfully...";
        }
        return "Mail notSent" ;
    }*/
/*        @Override
    public String sendSimpleMail(int idUser, EmailDetails details) {

        try {
            Event u = eventRepository.findById(idUser).get();
            String email = String.valueOf(u.getUsers().stream().findFirst());
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(email);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());
            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            return "Error while Sending Mail";
        }
    }*/
}
