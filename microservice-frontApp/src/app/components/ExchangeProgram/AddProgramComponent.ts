import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {ExchangeProgramService} from './exchange-program.service';
import {ExchangeProgram, ProgramType, Status} from './exchange-program.model';

@Component({
  selector: 'app-add-program',
  templateUrl: './AddProgram.component.html',
  styleUrls: ['./AddProgram.component.css'],
})
export class AddProgramComponent implements OnInit {
  program: ExchangeProgram = new ExchangeProgram();
  statuses = Object.values(Status);
  types = Object.values(ProgramType);

  constructor(private service: ExchangeProgramService) {
  }

  ngOnInit(): void {
  }

  saveOrUpdateProgram(): void {
    this.service.saveOrUpdateProgram(this.program).subscribe(response => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      });
      console.log('Program saved:', response);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      });
      console.error('Error saving program:', error);
    });
  }
}
