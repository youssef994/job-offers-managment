package com.example.exchangeservice.model;


import lombok.*;

import javax.persistence.*;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table(name = "ExchangeProgram ")
public class ExchangeProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer exchangeId;

    private String name;
    private String description;
    @Enumerated(EnumType.STRING)
    private ProgramType type;
    private String location;
    private Date startDate;
    private Date endDate;
    private int capacity;
    private int participantsNbr;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String details;
}
