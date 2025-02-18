package com.example.exchangeservice.service;



import com.example.exchangeservice.model.ExchangeProgram;
import com.example.exchangeservice.model.Participant;
import com.example.exchangeservice.model.ParticipationStatus;
import com.example.exchangeservice.model.ProgramType;
import com.example.exchangeservice.repository.ExchangeProgramRepository;
import com.example.exchangeservice.repository.ParticipantRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Transactional
public class ParticipantService {

    @Autowired
    private ExchangeProgramRepository exchangeProgramRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public Participant enrollParticipant(Integer exchangeProgramId, MultipartFile file) {
        ExchangeProgram program = exchangeProgramRepository.findById(exchangeProgramId)
                .orElseThrow(() -> new RuntimeException("Exchange Program not found for ID: " + exchangeProgramId));

        Participant participant = new Participant();
        participant.setExchangeProgram(program);

        String fileName = saveFile(file);
        participant.setFilePath(fileName);

        return participantRepository.save(participant);
    }


    public Optional<Participant> getParticipantById(Integer participantId) {
        return participantRepository.findById(participantId);
    }

    private String saveFile(MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(uploadDir + file.getOriginalFilename());
            Files.write(path, bytes);
            return file.getOriginalFilename();
        } catch (Exception e) {
            throw new RuntimeException("File upload failed!", e);
        }
    }
    public List<Participant> getParticipantsByExchangeProgram(Integer exchangeProgramId) {
        return participantRepository.findByExchangeProgram_ExchangeId(exchangeProgramId);
    }
    public Resource downloadFileByParticipantId(Integer participantId) throws Exception {
        Participant participant = participantRepository.findById(participantId).orElseThrow(() -> new Exception("Participant not found"));
        String fileName = participant.getFilePath();
        Path path = Paths.get(uploadDir + fileName);
        Resource resource = new UrlResource(path.toUri());
        if (!resource.exists()) {
            throw new FileNotFoundException("File not found: " + fileName);
        }
        return resource;
    }
    public Participant updateParticipantStatus(Integer participantId, ParticipationStatus newStatus) throws Exception {
        Participant participant = participantRepository.findById(participantId).orElseThrow(() -> new Exception("Participant not found"));
        participant.setStatus(newStatus);
        return participantRepository.save(participant);
    }
}