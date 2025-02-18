package com.example.exchangeservice.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer participantId;

    private Integer userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exchange_program_id")
    private ExchangeProgram exchangeProgram;

    @Enumerated(EnumType.STRING)
    private ParticipationStatus status;

    @Column(name = "file_path")
    private String filePath;
}
