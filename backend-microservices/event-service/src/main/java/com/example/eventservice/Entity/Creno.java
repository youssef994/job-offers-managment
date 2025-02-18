package com.example.eventservice.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Table(name = "creno")

public class Creno implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCreno")
    int idCreno;
    @Temporal(TemporalType.DATE)
    Date dateDebut;
    @Temporal(TemporalType.DATE)
    Date dateFin;
    int Occurence;;

    //NEW
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JsonIgnore
    private Event event;



    @OneToMany(cascade = CascadeType.ALL, mappedBy = "creno")
    public List<Plannification> plannifications;

}
