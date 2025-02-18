package com.example.exchangeservice.service;



import com.example.exchangeservice.model.ExchangeProgram;
import com.example.exchangeservice.model.ProgramType;
import com.example.exchangeservice.repository.ExchangeProgramRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Transactional
public class ExchangeProgramService  {

    @Autowired
    private ExchangeProgramRepository exchangeProgramRepository;

    public ExchangeProgram saveOrUpdateProgram(ExchangeProgram program) {
        return exchangeProgramRepository.save(program);
    }
    public Optional<ExchangeProgram> getProgramById(Integer programId) {
        return exchangeProgramRepository.findById(programId);
    }
    public List<ExchangeProgram> getAllPrograms() {
        return exchangeProgramRepository.findAll();
    }
    public void deleteProgram(Integer programId) {
        exchangeProgramRepository.deleteById(programId);
    }
    public List<ExchangeProgram> getProgramsByType(ProgramType type) {
        return exchangeProgramRepository.findByType(type);
    }
    public boolean checkProgramAvailability(Integer programId) {
        Optional<ExchangeProgram> program = exchangeProgramRepository.findById(programId);
        if (program.isPresent()) {
            return program.get().getParticipantsNbr() < program.get().getCapacity();
        }
        return false;
    }
}
