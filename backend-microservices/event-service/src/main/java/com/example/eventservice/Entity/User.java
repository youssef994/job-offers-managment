package com.example.eventservice.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name="Users")
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid", nullable = false)
    private Integer userid;
    private String firstname;
    private String Lastname;
    private String userName;
    private String Email;
    private String Password;
    private int phone_number;
    private String gender;
    private int CIN;
    private Date DateNaissance;
    @Enumerated(EnumType.STRING)
    private TypeUser typeUser;

}
