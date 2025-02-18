import { Component, OnInit } from '@angular/core';
import {Booking} from "../get-all-booking/booking";
import {BookingService} from "../get-all-booking/booking.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-extend-booking',
  templateUrl: './extend-booking.component.html',
  styleUrls: ['./extend-booking.component.css']
})
export class ExtendBookingComponent implements OnInit {
  bookingId: number = 0;
  newEndDate: string = '';
  token: string = '';
  amount: number = 0;
  currency: string = '';


  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.bookingService.extendBooking(this.bookingId, this.newEndDate, this.token, this.amount, this.currency)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
  }
}
