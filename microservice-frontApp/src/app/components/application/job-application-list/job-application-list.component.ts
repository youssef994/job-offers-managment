import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApplicationStatus, JobApplication} from "../model";
import {JobApplicationService} from "../job-application.service";
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-application-list',
  templateUrl: './job-application-list.component.html',
  styleUrls: ['./job-application-list.component.css']
})
export class JobApplicationListComponent {
  jobId: number;
  applicationId: number;

  applications: JobApplication[] = [];
  ApplicationStatus = ApplicationStatus;
constructor(
  private router: Router,
  private route: ActivatedRoute,
  private jobApplicationService: JobApplicationService
) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = +params['jobId'];
      if (this.jobId) {
        this.loadApplications();
      }
    });
  }
  getResumeLink(resumePath: string): string {
    return `http://localhost:5555/api/files/resume/${resumePath}`;
  }
  loadApplications(): void {
    this.jobApplicationService.getApplicationsByJobId(this.jobId)
      .subscribe(data => {
        this.applications = data;
      });
  }
  viewCandidateProfile(candidateId: string | number): void {
    this.router.navigate([`/candidate-profile/${candidateId}`]);
  }
  updateApplicationStatus(applicationId: number, status: ApplicationStatus): void {
    this.jobApplicationService.updateApplicationStatus(applicationId, status)
      .subscribe(response => {
        const application = this.applications.find(app => app.applicationId === applicationId);
        if (application) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          application.status = status;
        }
      }, error => {
        console.error('Error updating application status:', error);
      });
  }
}
