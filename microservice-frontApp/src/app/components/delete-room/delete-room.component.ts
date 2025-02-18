import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Room, RoomType } from '../room_services/room';
import {Router} from "@angular/router";
import {RoomService} from '../room_services/room.service';

@Component({
  selector: 'app-delete-room',
  template: `
    <button class="btn btn-danger" (click)="deleteRoom()">Delete</button>
  `
})
export class DeleteRoomComponent {
  @Input() room!: Room;
  @Output() roomDeleted = new EventEmitter<Room>();

  constructor(private roomService: RoomService) {}

  deleteRoom(): void {
    if (confirm(`Are you sure you want to delete room ${this.room.roomNumber}?`)) {
      this.roomService.deleteRoom(this.room.roomNumber).subscribe(
        () => {
          console.log(`Room ${this.room.roomNumber} deleted`);
          this.roomDeleted.emit(this.room);
        },
        (error) => console.log(`Error deleting room: ${error}`)
      );
    }
  }
}
