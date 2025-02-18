import { Component, OnInit } from '@angular/core';
import {Booking} from '../get-all-booking/booking';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookingService} from '../get-all-booking/booking.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-logement',
  templateUrl: './logement.component.html',
  styleUrls: ['./logement.component.scss']
})
export class LogementComponent implements OnInit {
  bookings: Booking[] = [];
  extendBookingForm: FormGroup;
  deleteBookingForm: FormGroup;
  deletingBooking = false;
  filteredBookings: Booking[] = [];
  searchTerm: any;
  searchOption: any;

  constructor(
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.extendBookingForm = this.formBuilder.group({
      newEndDate: ['', Validators.required],
      token: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required]
    });

    this.deleteBookingForm = this.formBuilder.group({
      bookingId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings(): void {
    this.bookingService.getAllBookings().subscribe((bookings: Booking[]) => {
      this.bookings = bookings;
      this.filteredBookings = bookings;
    });
  }

  deleteBooking(bookingId: number): void {
    this.deletingBooking = true;
    this.bookingService.deleteBooking(bookingId).subscribe(() => {
      this.bookings = this.bookings.filter(
        (booking) => booking.bookingId !== bookingId
      );
      this.filteredBookings = this.filteredBookings.filter(
        (booking) => booking.bookingId !== bookingId
      );
      this.snackBar.open('Booking deleted successfully', 'Close', {
        duration: 3000
      });
    }, () => {
      this.snackBar.open('Error deleting booking', 'Close', {duration: 3000});
    }).add(() => {
      this.deletingBooking = false;
    });
  }

  filterBookings(): void {
    if (!this.searchTerm) {
      // if the search query is empty, show all bookings
      this.filteredBookings = this.bookings;
    } else {
      // filter the bookings based on the selected search option
      switch (this.searchOption) {
        case 'id':
          this.filteredBookings = this.bookings.filter((booking) =>
            booking.bookingId.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'roomId':
          this.filteredBookings = this.bookings.filter((booking) =>
            booking.roomId.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'userEmail':
          this.filteredBookings = this.bookings.filter((booking) =>
            booking.userEmail.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        default:
          this.filteredBookings = this.bookings;
          break;
      }
    }
  }

  goToExtendBooking(bookingId: number): void {
    this.router.navigate(['ExtendBooking', bookingId]);
  }


}
