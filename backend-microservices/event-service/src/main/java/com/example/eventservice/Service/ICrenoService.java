package com.example.eventservice.Service;

import com.example.eventservice.Entity.*;

import java.util.List;
import java.util.Optional;
public interface ICrenoService {

    //    List<Universite> retrieveAllUniversites();
//    Creno addCreno(Creno e); // ajouter l’équipe avec son détail

    Creno addCreno(Creno e, int idEvent);

    List<Creno> getAllCrenos();
    Optional<Creno> getCreno(int id);

    void affecterCrenoEvent(int idCreno, int idEvent);

    List<Creno> retriveCrenoEvent(int idEvent);


}

