import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppAuthService} from './app-auth.service';
import {Observable} from 'rxjs';
import {LoginData} from '../LoginData';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  PATH_OF_API = 'http://localhost:7272';
  PATH_OF_API2 = 'http://localhost:3333';

  requestHeader = new HttpHeaders({
    'No-Auth': 'True',
    'Content-Type': 'application/json'
  });

  constructor(private httpclient: HttpClient,
              private appAuthService: AppAuthService) {
  }

  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.appAuthService.getToken()
    });
    return this.httpclient.delete(`${this.PATH_OF_API}/auth/deleteUser/${id}`, {headers: headers, responseType: 'text'});
  }

  getAllUsersByRole(role: string): Observable<any> {
    return this.httpclient.get(`${this.PATH_OF_API}/auth/byRole`, {
      headers: this.getAuthenticatedHeaders(),
      params: {
        role: role
      }
    });
  }

  public login(loginData: LoginData) {
    return this.httpclient.post(this.PATH_OF_API + '/auth/token', loginData, {headers: this.requestHeader});

  }

  getAuthenticatedHeaders() {
    const token = this.appAuthService.getToken();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
  }

  public roleMatch(allowedRole: string): boolean {
    const appRole: string = this.appAuthService.getRole();
    const isMatch = appRole === allowedRole;
    return isMatch;
  }

  public adminAccess() {
    return this.httpclient.get(this.PATH_OF_API + '/auth/adminEndpoint', {responseType: 'text'});
  }

  registerUser(data: any): Observable<any> {
    return this.httpclient.post(this.PATH_OF_API + '/auth/register', data);
  }

  verifyEmail(code: string): Observable<any> {
    return this.httpclient.get(this.PATH_OF_API + `/auth/verify-email?code=${code}`, {responseType: 'text'});
  }

  public getCandidateByUserId(): Observable<any> {
    const userId = this.appAuthService.getUserId();
    return this.httpclient.get(`${this.PATH_OF_API2}/candidate/search/findByUserId?userId=${userId}`);
  }

  createCandidate(candidate: any): Observable<any> {
    return this.httpclient.post(this.PATH_OF_API2 + '/candidate/create', candidate, {headers: this.requestHeader});
  }
}
