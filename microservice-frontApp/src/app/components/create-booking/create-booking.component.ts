import { Component, OnInit } from '@angular/core';
import {Booking} from "../get-all-booking/booking";
import {BookingService} from "../get-all-booking/booking.service";
import {Room} from "../room_services/room";
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {
  booking: Booking = new Booking();
  token: string = '';
  amount: number = 0;
  currency: string = '';
  bookingForm: FormGroup;
  isCreatingBooking: boolean = false;


  constructor(private bookingService: BookingService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar ) {
    this.bookingForm = this.formBuilder.group({
      roomId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      totalPrice: ['', Validators.required],
      token: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  isLoading = false;

  onSubmit(): void {
    this.isCreatingBooking = true;
    this.bookingService.createBooking(this.booking, this.token, this.amount, this.currency)
      .subscribe(
        response => {
          console.log(response);
          this.isCreatingBooking = false;
          this.snackBar.open('Booking created successfully!', 'Close', { duration: 3000 });
        },
        error => {
          console.log(error);
          this.isCreatingBooking = false;
          this.snackBar.open('Error : The foyer is not available!', 'Close', { duration: 3000 });
        }
      );
  }

  openBookingForm(room: Room): void {
    const dialogRef = this.dialog.open(CreateBookingComponent, {
      width: '500px',
      data: room
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
