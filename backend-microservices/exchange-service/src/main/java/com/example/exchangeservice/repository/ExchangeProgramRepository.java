package com.example.exchangeservice.repository;

import com.example.exchangeservice.model.ExchangeProgram;
import com.example.exchangeservice.model.ProgramType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeProgramRepository  extends JpaRepository<ExchangeProgram, Integer> {
    List<ExchangeProgram> findByType(ProgramType type);

}