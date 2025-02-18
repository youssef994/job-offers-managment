package com.example.eventservice.Controller;

import com.example.eventservice.Entity.Plannification;
import com.example.eventservice.Service.IPlannificationService;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("plannification")
public class PlannificationController {
    private IPlannificationService iPlannificationService;
    @GetMapping("get-plans")
    public ResponseEntity getAllPlannifications() {


        List<Plannification> AllPlannification = iPlannificationService.getAllPlannifications();
        return new ResponseEntity<>(AllPlannification, HttpStatus.CREATED);

    }
    @GetMapping("get-plan/{id}")
    public ResponseEntity getPlannification(@PathVariable int id) {
        System.out.println("ID"+id);

        Optional<Plannification> plannification = iPlannificationService.getPlannification(id);
        return new ResponseEntity<>(plannification, HttpStatus.CREATED);

    }
    @PostMapping("addplan/{idCreno}")
    public ResponseEntity<Plannification> addPlannification(@RequestBody Plannification p, @PathVariable("idCreno") Integer idCreno) {
        System.out.println(p);


        iPlannificationService.addPlan(p,idCreno);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }



}
