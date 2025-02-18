import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  BASE_URL = 'http://localhost:7272';

  constructor(private http: HttpClient) {
  }

  getAllUsersByRole(role: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/byRole`, {
      params: {
        role: role
      }
    });
  }
}
