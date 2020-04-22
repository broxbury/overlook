class Rooms {
  constructor(rooms) {
    this.rooms = rooms;
  }

  getAvailableRoomsByDate(date, bookings) {
    let bookingsByDate = bookings.filter(booking => booking.date === date);
    let roomsBookedbyDate = bookingsByDate.reduce((array, booking) => {
      array.push(this.rooms.find(room => booking.roomNumber === room.number))
      return array
    }, []);
    return this.rooms.filter(bookedRoom => !roomsBookedbyDate
      .includes(bookedRoom))
  }

  filterRoomsByType(availableRooms, roomType) {
    return availableRooms.filter(room => room.roomType === roomType)
  }

  getRoomById(id) {
    return this.rooms.find(room => room.number == id);
  }
}
export default Rooms;
