package com.example.eventservice.Repository;


import com.example.eventservice.Entity.*;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
    @Query(value = "SELECT * FROM users AS user INNER JOIN event_participants AS ep" +
            " ON user.id_user = ep.participants_id_user" +
            " INNER JOIN event AS events ON ep.events_id_event =     events.id_user and user.id_user = :iduser",
            nativeQuery = true)
    List<User> getAllusersByEvent(@Param("iduser") int iduser);


}
