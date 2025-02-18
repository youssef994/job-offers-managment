import { Component } from '@angular/core';
import {CompanyDetails} from "../company";
import {CompanyService} from "../company.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-get',
  templateUrl: './company-get.component.html',
  styleUrls: ['./company-get.component.css']
})
export class CompanyGetComponent {
  companyDetails: CompanyDetails | null;

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.loadCompanyDetails();
  }
  redirectToCreateJob() {
    if (this.companyDetails && this.companyDetails.companyId) {
      console.log('companyId:', this.companyDetails.companyId);
      this.router.navigate(['/create-job', this.companyDetails.companyId]);
    } else {
      console.log('companyId is undefined or null.');
    }
  }
  loadCompanyDetails() {
    this.companyService.getCompanyByUserId().subscribe(
      (data) => {
        this.companyDetails = data;
        console.log('Company details:', data);
      },
      (error) => {
        console.error('Error loading company details:', error);
      }
    );
  }
}
