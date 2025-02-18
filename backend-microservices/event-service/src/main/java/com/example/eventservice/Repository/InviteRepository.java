package com.example.eventservice.Repository;

import com.example.eventservice.Entity.invite;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InviteRepository extends JpaRepository<invite, Integer> {

}
