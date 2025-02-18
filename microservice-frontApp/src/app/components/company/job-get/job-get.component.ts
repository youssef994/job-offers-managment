import { Component } from '@angular/core';
import {CompanyService} from "../company.service";
import {JobApplicationService} from "../../application/job-application.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-job-get',
  templateUrl: './job-get.component.html',
  styleUrls: ['./job-get.component.css']
})
export class JobGetComponent {
  jobDetails: any[] = [];
  filter: string = '';
  jobTypeFilter: string = '';
  isModalOpen = false;
  selectedJobId?: number;
  selectedResume: File | null = null;

  constructor(private companyService: CompanyService, private jobApplicationService: JobApplicationService) {
  }

  ngOnInit(): void {
    this.loadJobDetails();
  }

  loadJobDetails(): void {
    this.companyService.getAllJobs().subscribe((data) => {
      this.jobDetails = data;
    });
  }

  closeApplyModal(): void {
    this.isModalOpen = false;
    this.selectedResume = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedResume = input.files[0];
      console.log("Selected file:", this.selectedResume.name);
    }
  }

  openApplyModal(job: any): void {
    this.selectedJobId = job.jobId;
    this.isModalOpen = true;
  }


  applyForJobWithUpload(): void {
    console.log('Selected Resume:', this.selectedResume);
    console.log('Selected Job ID:', this.selectedJobId);
    if (!this.selectedResume || !this.selectedJobId) {
      Swal.fire('Please select a resume to upload')
      return;
    }
    this.jobApplicationService.applyForJobWithUpload(this.selectedResume, this.selectedJobId)
      .subscribe(
        (data) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Application uploaded successfully',
            showConfirmButton: false,
            timer: 1500
          })
          console.log("Application uploaded successfully:", data);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error uploading application!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
          console.error("Error uploading application:", error);
        }
      );
  }
}
