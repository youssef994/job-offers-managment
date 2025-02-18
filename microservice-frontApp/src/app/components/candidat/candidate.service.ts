import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidate} from "./model";


@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  PATH_OF_API = "http://localhost:3333";
  requestHeader = new HttpHeaders({
    "No-Auth": "True",
    "Content-Type": "application/json"
  });
  constructor(private http: HttpClient) {}
  getCandidateById(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.PATH_OF_API}/candidate/${id}`);
  }

  getCandidateUserId(): Observable<Candidate> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return this.getCandidateByUserId(parseInt(userId, 10));
    }
    return new Observable<Candidate>();
  }
  getCandidateByUserId(userId: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.PATH_OF_API}/candidate/getCandidateByUserId/${userId}`);
  }
  updateCandidate(updatedCandidate: any): Observable<any> {
    const id = localStorage.getItem('id');
    if (id) {
      return this.http.put(`${this.PATH_OF_API}/candidate/update/${id}`, updatedCandidate);
    } else {
      throw new Error('Candidate ID not found in local storage');
    }
  }

}
