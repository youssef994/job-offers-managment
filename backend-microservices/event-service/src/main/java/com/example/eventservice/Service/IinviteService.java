package com.example.eventservice.Service;

import com.example.eventservice.Entity.invite;

import java.util.List;
import java.util.Optional;

public interface IinviteService {

    //    List<Universite> retrieveAllUniversites();
    invite addInvite(invite i); // ajouter l’équipe avec son détail
    List<invite> getAllInvite();
    Optional<invite> getInvite(int id);
//    Universite updateUniversite (Universite e);
//    Universite retrieveUniversite (Integer idUniversite);
//    void assignUniversiteToDepartement(Integer IdUniversite, Integer IdDepartement);
}

