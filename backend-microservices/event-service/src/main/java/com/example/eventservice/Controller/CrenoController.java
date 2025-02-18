package com.example.eventservice.Controller;



import com.example.eventservice.Entity.Creno;
import com.example.eventservice.Repository.CrenoRepository;
import com.example.eventservice.Repository.EventRepository;
import com.example.eventservice.Service.ICrenoService;
import com.example.eventservice.Service.IEventService;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("creno")
public class CrenoController {
    @Autowired
    private ICrenoService iCrenoService;
    @Autowired
    private IEventService iEventService;

    @Autowired
    CrenoRepository crenoRepository;
    @Autowired
    private EventRepository eventRepository;

    @GetMapping("get-crenos")
    public ResponseEntity getAllCrenos() {
        List<Creno> AllCrenos = iCrenoService.getAllCrenos();
        System.out.println(AllCrenos.size());

        return new ResponseEntity(AllCrenos, HttpStatus.ACCEPTED);

    }
    @GetMapping("get-creno/{id}")
    public ResponseEntity getCreno(@PathVariable int id) {
        System.out.println("ID"+id);

        Optional<Creno> creno = iCrenoService.getCreno(id);
        return new ResponseEntity<>(creno, HttpStatus.CREATED);

    }
    @PostMapping("addcreno/{idEvent}")
    public ResponseEntity<Creno> addCreno(@RequestBody Creno c, @PathVariable("idEvent") Integer idEvent) {

        //System.out.println("ID"+idEvent);
        //Optional<Event> event = iEventService.getEvent(idEvent);
      //  System.out.println(c);
    //   Optional<Event> e = iEventService.getEvent(idEvent.intValue());
     //   c.setEvent(event.get());
        iCrenoService.addCreno(c,idEvent);
        return new ResponseEntity<>(HttpStatus.CREATED);

        //return coursClassroomService.ajouterCoursClassroom(cc, classeId);

    }
    @GetMapping("getListEvent/{id}")
    public ResponseEntity getEventByCreno(@PathVariable int id) {
        System.out.println("ID"+id);
        List<Creno> event = iCrenoService.retriveCrenoEvent(id);
        return new ResponseEntity<>(event, HttpStatus.CREATED);

    }

}
