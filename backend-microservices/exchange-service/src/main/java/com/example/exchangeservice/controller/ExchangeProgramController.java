package com.example.exchangeservice.controller;


import com.example.exchangeservice.model.ExchangeProgram;
import com.example.exchangeservice.model.ProgramType;
import com.example.exchangeservice.service.ExchangeProgramService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@RequestMapping("/api/exchange-program")
public class ExchangeProgramController {

    @Autowired
    private ExchangeProgramService exchangeProgramService;

    @PostMapping
    public ResponseEntity<ExchangeProgram> saveOrUpdateProgram(@RequestBody ExchangeProgram program) {
        return ResponseEntity.ok(exchangeProgramService.saveOrUpdateProgram(program));
    }

    @GetMapping("/{programId}")
    public ResponseEntity<Optional<ExchangeProgram>> getProgramById(@PathVariable("programId") Integer programId) {
        return ResponseEntity.ok(exchangeProgramService.getProgramById(programId));
    }
    @GetMapping
    public ResponseEntity<List<ExchangeProgram>> getAllPrograms() {
        return ResponseEntity.ok(exchangeProgramService.getAllPrograms());
    }

    @DeleteMapping("/{programId}")
    public ResponseEntity<Void> deleteProgram(@PathVariable("programId") Integer programId) {
        exchangeProgramService.deleteProgram(programId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<ExchangeProgram>> getProgramsByType(@PathVariable("type") ProgramType type) {
        return ResponseEntity.ok(exchangeProgramService.getProgramsByType(type));
    }

    @GetMapping("/{programId}/availability")
    public ResponseEntity<Boolean> checkProgramAvailability(@PathVariable("programId") Integer programId) {
        return ResponseEntity.ok(exchangeProgramService.checkProgramAvailability(programId));
    }
}