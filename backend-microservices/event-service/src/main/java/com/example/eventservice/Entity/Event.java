package com.example.eventservice.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Table(name = "event")
public class Event implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idEvent;
    String name;
    String objectif;
    @Enumerated(EnumType.STRING)
    public state state;
    public String description;
    public String location;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "idCreno")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Creno> crenos;

    //event creator
   // @ManyToOne//( optional = false)
   // @JoinColumn(name = "id_user", nullable = false)
   // @OnDelete(action = OnDeleteAction.CASCADE)
  //  @JsonIgnore
 //   private User user;


    //participants list
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "event")
    @JsonIgnore
    private Set<participant> participants;
//




//    @ManyToMany
//    Set<User> users;
    //event participants
//    @ManyToMany(mappedBy = "events")
//    Set<User> participants;


//    @ManyToMany(cascade = CascadeType.ALL)
//    Set<invite> invites;


}
