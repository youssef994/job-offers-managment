package com.example.eventservice.Service;

import com.example.eventservice.Entity.Event;
import com.example.eventservice.Entity.User;
import com.example.eventservice.Entity.participant;
import com.example.eventservice.Repository.EventRepository;
import com.example.eventservice.Repository.UserRepository;
import com.example.eventservice.Repository.participantRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
public class participantService implements IparticipantService{
    @Autowired
    participantRepository participantRepo ;
    @Autowired
    EventRepository eventRepository;
    @Autowired
    UserRepository userRepository;


        @Override
        @Transactional
        public void  participateToEvent(participant p , int idUser, int idEvent) {

        User Us = userRepository.findById(idUser).get();
        p.setUsersP(Us);

        Event Ev = eventRepository.findById(idEvent).get();
        p.setEvent(Ev);

       participantRepo.save(p);
    }

   @Override
    public participant retrieveParticipants(Integer id) {
        return participantRepo.findById (id).orElse(null);
    }
    @Override
    public List<participant> getAllParticipants() {
        return participantRepo.findAll();
    }

    @Override
    public List<participant> getParticipantsByEvent(int idEvent) {
            Event event = eventRepository.findById(idEvent).get();
            return participantRepo.findByEvent(event);
    }
    /* @Override
    public List<OffreRestaurant> retrieveAllOffreByRestaurant(Integer id) {// te5ou les offre mta3 restaurant we7ed
        Restaurant restaurant= restaurantRepository.findById(id).get();
        return offrerestaurantRepository.findByRestaurant(restaurant);
    }*/


}
