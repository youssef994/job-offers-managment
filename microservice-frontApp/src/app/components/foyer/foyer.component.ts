import { Component, OnInit } from '@angular/core';
import {Room, RoomType} from "../room_services/room";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {CreateBookingComponent} from "../create-booking/create-booking.component";
import {RoomService} from '../room_services/room.service';

@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.css']
})
export class FoyerComponent implements OnInit {
  rooms: Room[] = [];
  roomTypes = Object.values(RoomType);
  selectedRoom: Room | undefined;


  constructor(private roomService: RoomService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getRooms();

  }

  getRooms(): void {
    this.roomService.getRooms().subscribe((rooms) => (this.rooms = rooms));
  }
  updateRoom(roomNumber: string, room: Room): void {
    this.roomService.updateRoom(roomNumber, room).subscribe(() => {
      this.getRooms();
    });
  }
  onSelect(room: Room): void {
    this.selectedRoom = room;
  }
  createBooking(roomId: number): void {
    this.router.navigate(['/createBooking', roomId]);
  }
  openBookingForm(room: Room): void {
    console.log('Room ID:', room.id); // add this line
    const dialogRef = this.dialog.open(CreateBookingComponent, {
      width: '500px',
      height: '600px',
      data: {roomId: room.id}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getRooms();
    });
    dialogRef.componentInstance.booking.roomId = room.id;

  }
}
