import { Component } from '@angular/core';
import { CompanyService } from '../company.service';
import { CompanyDetails } from '../company';
import Swal from "sweetalert2";

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent {
  companyDetails: CompanyDetails = new CompanyDetails();
  isCompanyExist: boolean = false;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.checkIfCompanyExists();
  }

  onSubmit() {
    if (this.isCompanyExist) {
      console.log('Company already exists.');
      return;
    }

    this.saveCompany();
  }

  saveCompany() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }
    this.companyDetails.userId = Number(userId);

    this.companyService.saveCompany(this.companyDetails).subscribe(
      (data) => {
        console.log('Company saved:', data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Profile Saved!',
          showConfirmButton: false,
          timer: 1500
        })
        this.isCompanyExist = true;
        if (data && data.companyId) {
          localStorage.setItem('companyId', data.companyId.toString());
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        console.error('Error saving company:', error);
      }
    );
  }

  checkIfCompanyExists() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Profile Dont Exist!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      console.error('User ID not found in localStorage');
      return;
    }

    this.companyService.getCompanyByUserId().subscribe(
      (company) => {
        if (company) {
          this.isCompanyExist = true;
        } else {
          this.isCompanyExist = false;
        }
      },
      (error) => {
        this.isCompanyExist = false;
      }
    );
  }

}
