package com.example.eventservice.Entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Table(name="invite")
public class invite implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idInvite ;
    String fullName ;
    int phoneNumber ;
    String email ;

//    @ManyToMany()
//    Set<Event> event;



}
