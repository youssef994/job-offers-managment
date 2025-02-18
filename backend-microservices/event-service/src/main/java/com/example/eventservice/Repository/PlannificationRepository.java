package com.example.eventservice.Repository;

import com.example.eventservice.Entity.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlannificationRepository extends JpaRepository<Plannification, Integer> {

    @Query(value = "SELECT * FROM plannification p WHERE p.creno_id_creno = :id_creno",
            nativeQuery = true)
    List<Plannification> getCrenoFromPlans(@Param("id_creno") int id_event);

}
