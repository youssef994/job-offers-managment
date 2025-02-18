import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {CompanyDetails} from "./company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:4444/company'
  private jobApiUrl = 'http://localhost:4444/jobs'

  constructor(private http: HttpClient) {
  }

  saveCompany(companyDetails: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return new Observable(observer => {
        observer.error('user not found');
      });
    }
    const url = `${this.apiUrl}/save?userId=${userId}`;
    return this.http.post<any>(url, companyDetails);
  }

  getCompanyByUserId(): Observable<CompanyDetails | null> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found ');
      return new Observable<CompanyDetails | null>();
    }

    const url = `${this.apiUrl}/search/findByUserId?userId=${userId}`;
    return this.http.get<CompanyDetails>(url);
  }

  addCompanyJob(companyId: number, jobDetails: any): Observable<any> {
    const url = `${this.jobApiUrl}/${companyId}`;
    return this.http.post<any>(url, jobDetails);
  }

  getAllJobsByCompanyId(companyId: number): Observable<any> {
    const url = `${this.jobApiUrl}/company/${companyId}`;
    return this.http.get(url);
  }

  deleteJob(jobId: number): Observable<void> {
    const url = `${this.jobApiUrl}/${jobId}`;
    return this.http.delete<void>(url);
  }
  getAllJobs(): Observable<any[]> {
    const url = `${this.jobApiUrl}/all-jobs`;
    return this.http.get<any[]>(url);
  }


}
