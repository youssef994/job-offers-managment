import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "../company.service";
import {CompanyDetails} from "../company";
import {AppService} from "src/app/pages/login/_services/app.service";
import {JobApplication} from "../../application/model";
import {JobApplicationService} from "../../application/job-application.service";
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-job-get-by-company-id',
  templateUrl: './job-get-by-company-id.component.html',
  styleUrls: ['./job-get-by-company-id.component.css']
})
export class JobGetByCompanyIdComponent {
  companyId: number;
  jobs: any[];
  companyDetails: CompanyDetails | null;
  applications: JobApplication[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private appService: AppService,
    private jobApplicationService: JobApplicationService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = +params['companyId'];
      if (this.companyId) {
        this.loadJobs();
      }
    });
  }

  deleteJob(jobId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.deleteJob(jobId)
          .subscribe(
            () => {
              Swal.fire(
                'Deleted!',
                'The job has been deleted.',
                'success'
              );
              this.loadJobs();
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to delete the job. Please try again.',
              });
            }
          );
      }
    });
  }


  loadJobs(): void {
    this.companyService.getAllJobsByCompanyId(this.companyId)
      .subscribe(data => {
        this.jobs = data;
      });
  }
  viewApplicationsForJob(jobId: number): void {
    this.router.navigate(['/applications', jobId]);
  }

}
