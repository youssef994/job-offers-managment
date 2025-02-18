package com.example.eventservice.Repository;


import com.example.eventservice.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface participantRepository extends JpaRepository<participant, Integer> {
    //  List<OffreRestaurant> findByRestaurant(Restaurant restaurant);
    List<participant> findByEvent(Event event);

}
