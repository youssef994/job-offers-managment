import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Room, RoomType } from '../room_services/room';
import {RoomService} from '../room_services/room.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {
  room!: Room;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.roomService.getRoomById(id).subscribe(room => {
        this.room = room;
      });
    }
  }


  updateRoom() {
    this.roomService.updateRoom(this.room.id, this.room).subscribe(() => {
      this.router.navigate(['/rooms']);
    });
  }

  protected readonly RoomType = RoomType;
}
