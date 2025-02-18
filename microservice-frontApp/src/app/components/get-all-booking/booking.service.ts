import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Booking} from "./booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:5757/api/booking';

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}`);
  }
  createBooking(booking: Booking, token: string, amount: number, currency: string): Observable<Booking> {
    const url = `${this.baseUrl}/create-booking?token=${token}&amount=${amount}&currency=${currency}`;
    return this.http.post<Booking>(url, booking);
  }
  extendBooking(bookingId: number, newEndDate: string, token: string, amount: number, currency: string): Observable<Booking> {
    const url = `${this.baseUrl}/${bookingId}/extend?newEndDate=${newEndDate}&token=${token}&amount=${amount}&currency=${currency}`;
    return this.http.post<Booking>(url, {});
  }


  deleteBooking(bookingId: number): Observable<void> {
    const url = `${this.baseUrl}/${bookingId}`;
    return this.http.delete<void>(url);
  }
  // getStatistics(startDate: string, endDate: string): Observable<Statistics> {
  //   const url = `${this.baseUrl}/statistics?startDate=${startDate}&endDate=${endDate}`;
  //   return this.http.get<Statistics>(url);
  // }

}
