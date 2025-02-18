import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExchangeProgram} from "./exchange-program.model";

@Injectable({
  providedIn: 'root'
})
export class ExchangeProgramService {
  private apiUrl = 'http://localhost:8989'; // You should replace this with the appropriate URL

  constructor(private http: HttpClient) { }


  saveOrUpdateProgram(program: ExchangeProgram): Observable<ExchangeProgram> {
    return this.http.post<ExchangeProgram>(`${this.apiUrl}/api/exchange-program/`, program);
  }
}
