import $ from 'jquery';
import index from './index'
import User from './User'


const domUpdates = {
  verifyUserSignIn(userName, password) {
    if (userName === '') {
      alert('Please enter a Username')
    }
    if (password !== 'overlook2020') {
      alert('Please enter a valid Password')
    }
    if (!userName !== '' && !password !== '') {
      index.createUser(userName)
      $('.log-in').toggleClass('hidden');
      $('.main-page').toggleClass('hidden')
    }
  },

  makeResultsCardsHTML(roomsToDisplay) {
    $('.bookings-main').toggleClass('hidden');
    $('.user-results').toggleClass('hidden');
    roomsToDisplay.map(room => {
      $('#insert-results-here').append(
        `<section class="room-card-${room.roomType.replace(' ', '-')}" data-id="${room.number}">
        <section class="room-info">
          <h3 class="room-card-header">${room.roomType.toUpperCase()} No. ${room.number}</h3>
        <section class="room-icons">
          <img class="breakfast-img" src="../images/breakfast.png">
        </section>
        </section>
      </section>`)
    });
  },

  showPastReservations(userBookings, amountSpent, roomsData, user) {
    
    $('.bookings-main').toggleClass('hidden');
    $('.reservations-page').toggleClass('hidden');
    $('.main-page-user').toggleClass('hidden')
    userBookings.map(booking => {
      $('.insert-table-data').append(
        `<tr>
          <td>${booking.roomNumber}</td>
          <td>${booking.date}</td>
          <td>${user.calculateAmountByBooking(booking, roomsData)}</td>
        </tr>`
      )
    });
    $('.total-cost').append(`Total Amount Spent: $${amountSpent}`)
  }


}
export default domUpdates;
