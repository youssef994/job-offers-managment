import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JobApplication} from "./model";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private baseUrl = 'http://localhost:5555/applications/upload';
  private url = 'http://localhost:5555/applications';

  constructor(private http: HttpClient) { }

  applyForJob(jobApplication: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.baseUrl, jobApplication);
  }

  getApplicationById(applicationId: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.baseUrl}/${applicationId}`);
  }

  getApplicationsByCandidateId(): Observable<JobApplication[]> {
    const userId = localStorage.getItem('userId');
    return this.http.get<JobApplication[]>(`${this.baseUrl}?id=${userId}`);
  }
  applyForJobWithUpload(resume: File, jobId: number): Observable<any> {
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobId', jobId.toString());
    formData.append('userId', localStorage.getItem('userId') || '');

    return this.http.post<any>(this.baseUrl, formData);
  }

  getApplicationsByJobId(jobId: number): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.url}/getByJobId/${jobId}`);
  }
  updateApplicationStatus(applicationId: number, status: string): Observable<any> {
    const url = `${this.url}/${applicationId}/status`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(url, null, {
      params: { status: status },
      headers: headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
