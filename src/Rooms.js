class Rooms {
  constructor(rooms) {
    this.rooms = rooms;

  }

  getAvailableRoomsByDate(date, bookings) {
    return bookings.filter(booking => booking.date !== date);
    }

  filterRoomsByType(availableRooms, roomType) {
    console.log(availableRooms.filter(room => room.roomType === roomType));
  }


}
export default Rooms;
