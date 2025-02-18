import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../company.service';
import {tap} from 'rxjs/operators';
import Swal from "sweetalert2";

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent {
  companyId: number;
  jobDetails: any = {
    jobTitle: '',
    peopleNumber: 10,
    location: '',
    jobType: 'FULL_TIME',
    nbrHours: 40,
    startDate: new Date(),
    salary: 500,
    description: '',
  };

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router) {
    this.route.params.subscribe((params) => {
      this.companyId = +params['companyId'];
    });
  }

  redirectToGetAllJobsCompanyId() {
    if (this.companyId) {
      this.router.navigate(['/getAlljobsCompany', this.companyId]);
    } else {
      console.log('companyId is undefined or null.');
    }
  }
  createJob() {
    this.companyService.addCompanyJob(this.companyId, this.jobDetails).subscribe(
      (data) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Job created',
          showConfirmButton: false,
          timer: 1500
        })
        console.log('Job created:', data);
        this.redirectToGetAllJobsCompanyId();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error creating job!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        console.error('Error creating job:', error);
      }
    );
  }
  onButtonClicked() {
    if (this.jobDetails) {
      this.createJob();
    } else {
      this.redirectToGetAllJobsCompanyId();
    }
  }
}
