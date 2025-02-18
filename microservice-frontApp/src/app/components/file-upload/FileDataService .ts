import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileDataService  {
  private baseUrl = "http://localhost:3333/file";

  constructor(private http: HttpClient) {}

  uploadFile(userId: number, fileType: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('fileType', fileType);
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<string>(`${this.baseUrl}/upload`, formData, { headers });
  }

  downloadPDF(userId: number): Observable<Blob> {
    const url = `${this.baseUrl}/downloadPDF/${userId}`;
    return this.http.get(url, {
      responseType: 'blob',
    });
  }

  downloadImage(userId: number): Observable<Blob> {
    const url = `${this.baseUrl}/downloadImage/${userId}`;
    return this.http.get(url, {
      responseType: 'blob',
    });
  }
}
