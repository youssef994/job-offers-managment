import {Component, OnInit} from '@angular/core';
import {CandidateService} from './candidate.service';
import {Candidate, Level} from "./model";
import { CommonModule } from '@angular/common';
import { DatePipe, KeyValuePipe } from '@angular/common';
@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css'],
})
export class CandidateComponent implements OnInit {
  candidate: Candidate | undefined;

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.candidateService.getCandidateUserId().subscribe((data) => {
      this.candidate = data;
    });
  }

}
