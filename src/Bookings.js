class Bookings {
  constructor(bookings) {
    this.bookings = bookings;
  }

  calculateRevenueByDate(date, roomsData) {
    return this.bookings.filter(booking => booking.date === date).reduce((sum, booking) => {
      sum += roomsData.find(room => room.number === booking.roomNumber).costPerNight
      return sum;
    }, 0);
  }

  calculateBookingPercentage(date, roomsData) {
    let percentage = this.bookings.filter(booking => booking.date === date).length / roomsData.length;
    return Math.floor(percentage * 100);
    //takes in date, returns percentage of rooms that are booked for that date(manager portal)
  }

}

export default Bookings;
