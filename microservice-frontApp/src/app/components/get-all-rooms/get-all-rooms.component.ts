import { Component, OnInit } from '@angular/core';
import { Room, RoomType } from '../room_services/room';
import { CreateBookingComponent } from '../create-booking/create-booking.component';
import { Router } from '@angular/router';
import {RoomService} from '../room_services/room.service';

@Component({
  selector: 'app-get-all-rooms',
  templateUrl: './get-all-rooms.component.html',
  styleUrls: ['./get-all-rooms.component.css']
})
export class GetAllRoomsComponent implements OnInit {
  rooms: Room[] = [];
  roomTypes = Object.values(RoomType);
  selectedRoom: Room | undefined;
  filteredRooms: Room[] = [];
  searchTerm: string = '';
  searchOption: string = '';
  showBookingForm: boolean = false;
  selectedRoomId: number | null = null;

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
      this.filteredRooms = rooms;
    });
  }
  updateRoom(roomNumber: string, room: Room): void {
    this.roomService.updateRoom(roomNumber, room).subscribe(() => {
      this.getRooms();
    });
  }
  onSelect(room: Room): void {
    this.selectedRoom = room;
  }
  filterRooms(): void {
    if (!this.searchTerm) {
      this.filteredRooms = this.rooms;
    } else {
      switch (this.searchOption) {
        case 'roomNumber':
          this.filteredRooms = this.rooms.filter((room: Room) =>
            room.roomNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'roomType':
          this.filteredRooms = this.rooms.filter((room: Room) =>
            room.roomType.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'description':
          this.filteredRooms = this.rooms.filter((room: Room) =>
            room.description.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'surface':
          this.filteredRooms = this.rooms.filter((room: Room) =>
            room.surface.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'price':
          this.filteredRooms = this.rooms.filter((room: Room) =>
            room.price.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        default:
          this.filteredRooms = this.rooms;
          break;
      }
    }
  }  createBooking(roomId: number): void {
    this.router.navigate(['/createBooking', roomId]);
  }
  openBookingForm(room: Room): void {
    console.log('Room ID:', room.id);
    this.selectedRoomId = room.id;
    this.showBookingForm = true;
  }



}
