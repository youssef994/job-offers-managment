package com.example.exchangeservice.controller;


import com.example.exchangeservice.model.ExchangeProgram;
import com.example.exchangeservice.model.Participant;
import com.example.exchangeservice.model.ParticipationStatus;
import com.example.exchangeservice.model.ProgramType;
import com.example.exchangeservice.service.ExchangeProgramService;
import com.example.exchangeservice.service.ParticipantService;
import org.springframework.core.io.Resource;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@RequestMapping("/api/participants")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @PostMapping("/enroll")
    public ResponseEntity<Participant> enrollParticipant(@RequestParam Integer exchangeProgramId, @RequestParam("file") MultipartFile file) {
        Participant enrolledParticipant = participantService.enrollParticipant(exchangeProgramId, file);
        return ResponseEntity.ok(enrolledParticipant);
    }

    @GetMapping("/{participantId}")
    public ResponseEntity<Optional<Participant>> getParticipantById(@PathVariable Integer participantId) {
        return ResponseEntity.ok(participantService.getParticipantById(participantId));
    }
    @GetMapping("/exchange-program/{exchangeProgramId}")
    public ResponseEntity<List<Participant>> getParticipantsByExchangeProgram(@PathVariable Integer exchangeProgramId) {
        return ResponseEntity.ok(participantService.getParticipantsByExchangeProgram(exchangeProgramId));
    }

    @GetMapping("/{participantId}/download")
    public ResponseEntity<Resource> downloadFileByParticipantId(@PathVariable Integer participantId) throws Exception {
        Resource resource = participantService.downloadFileByParticipantId(participantId);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");
        return ResponseEntity.ok().headers(headers).body(resource);
    }

    @PutMapping("/{participantId}/status/{newStatus}")
    public ResponseEntity<Participant> updateParticipantStatus(@PathVariable Integer participantId, @PathVariable ParticipationStatus newStatus) throws Exception {
        return ResponseEntity.ok(participantService.updateParticipantStatus(participantId, newStatus));
    }
}