class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.bookings = [];
  }

  populateUserBookings(bookings) {
    bookings.filter(booking => booking.userID === this.id).forEach(booking => {
      if(!this.bookings.includes(booking))
      this.bookings.push(booking);
    });
    return this.bookings
  }

  calculateUserSpending(roomsData) {
    let amountSpent = this.bookings.reduce((sum, booking) => {
      sum += roomsData.find(room => room.number === booking.roomNumber).costPerNight;
      return sum
    }, 0);
    return Number.parseFloat((amountSpent).toFixed(2));
  }

  calculateAmountByBooking(booking, rooms) {
    return rooms.find(room => booking.roomNumber === room.number).costPerNight
  }

  managerSearchByUser(users, roomsData) {
    let currentUser = users.find(user => user.name === this.name);
    return {
      name: currentUser.name,
      bookingHistory: this.bookings,
      amountSpent: this.calculateUserSpending(roomsData)
    }
  }

  filterUpcomingBookings(date) {
  return this.bookings.filter(booking => booking.date > date)
  }

  filterPastBookings(date) {
  return this.bookings.filter(booking => booking.date < date)
  }

}
export default User;
