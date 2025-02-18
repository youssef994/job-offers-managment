import {Component, OnInit} from '@angular/core';
import {AppService} from "src/app/pages/login/_services/app.service";
import {CandidateService} from "../candidate.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.css']
})

export class CreateCandidateComponent implements OnInit {
  isUpdate: boolean = false;

  candidate: any = {
    userId: '',
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    birthDate: null,
    experiences: [],
    educationHistory: []
  };
  selectedFile: File | undefined;
  levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
  languages = ['ARABIC', 'ENGLISH', 'FRENCH', 'SPANISH', 'GERMAN', 'OTHER'];
  constructor(private appService: AppService, private candidateService: CandidateService, private toastr: ToastrService) {
    this.candidate = {
      userId: '',
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      phoneNumber: '',
      birthDate: null,
      experiences: [],
      educationHistory: []
    };
  }
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.candidate.userId = userId;
    }
  }
  addEducation() {
    this.candidate.educationHistory.push({
      school: null,
      startDate: null,
      endDate: null,
      degree: null
    });
  }

  removeEducation(index: number) {
    if (index >= 0 && index < this.candidate.educationHistory.length) {
      this.candidate.educationHistory.splice(index, 1);
    }
  }

  addExperience() {
    this.candidate.experiences.push({
      companyName: '',
      poste: '',
      position: '',
      startDate: null,
      endDate: null,
      description: ''
    });
  }

  removeExperience(index: number) {
    this.candidate.experiences.splice(index, 1);
  }





  onSubmit() {

    const candidateToSend = {...this.candidate};
    const formData = new FormData();
    formData.append('profilePicture', this.selectedFile || '');
    console.log(candidateToSend);

    this.appService.createCandidate(candidateToSend)
        .subscribe(
            data => {
              console.log('Candidate created!', data);
              this.toastr.success('Candidate successfully created!');

              if (data && data.id) {
                localStorage.setItem('id', data.id);
              }
            },
            error => {
              console.error('Error creating candidate', error);
              this.toastr.error('Error creating candidate!');
            }
        );
  }
}
