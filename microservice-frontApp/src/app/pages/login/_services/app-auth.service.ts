import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {

  constructor() {
  }

  public setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  public getRole(): string {
    return localStorage.getItem('role') || '';
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token') || '';
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return Boolean(this.getRole()) && Boolean(this.getToken());
  }

  public setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  public setUserName(userName: string): void {
    localStorage.setItem('userName', userName);
  }

  public getUserId(): string {
    return localStorage.getItem('userId') || '';
  }
}

