export class Room {
  id!: any;
  roomNumber!: any;
  roomType!: RoomType;
  description!: any;
  surface!: any;
  price!: any;
}

export enum RoomType {

  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  TRIPLE = 'TRIPLE',
  STUDIO = 'STUDIO'
}
