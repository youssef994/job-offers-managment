package com.example.exchangeservice.repository;

import com.example.exchangeservice.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
    List<Participant> findByExchangeProgram_ExchangeId(Integer exchangeId);

}