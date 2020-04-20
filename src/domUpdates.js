import $ from 'jquery';
import index from './index';
import User from './User';


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

  verifyManager(userName, password) {
    if (userName !== 'manager') {
      alert('Please enter a valid Username')
    }
    if (password !== 'overlook2020') {
      alert('Please enter a valid Password')
    }
    if (userName === 'manager' && password === 'overlook2020') {
      $('.log-in').toggleClass('hidden');
      $('.manager-page').toggleClass('hidden');
    }
  },

  makeResultsCardsHTML(roomsToDisplay, pageToDisplay) {
    $('.bookings-main').toggleClass('hidden');
    $('.user-results').toggleClass('hidden');
    roomsToDisplay.map(room => {
      $(`${pageToDisplay}`).append(
        `<section class="room-card-${room.roomType.replace(' ', '-')} roomcard" data-id="${room.number}">
        <section class="room-info">
          <h3 class="room-card-header">${room.roomType.toUpperCase()} No. ${room.number}</h3>
          <h3>Cost Per Night: $${room.costPerNight}</h3>
        <section class="room-icons">
        </section>
        </section>
      </section>`);
    });
  },

  togglePastFromMain(userBookings, amountSpent, roomsData, user) {
    $('.total-cost').empty();
    $('#insert-table-results tr').remove();
    $('.bookings-main').toggleClass('hidden');
    $('.past-reservations-page').toggleClass('hidden');
    $('.main-page-user').toggleClass('hidden');
    this.showPastReservations(userBookings, amountSpent, roomsData, user);
  },

  showPastReservations(userBookings, amountSpent, roomsData, user) {
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
  },

  showPastReservationsForManager(userBookings, amountSpent, roomsData, user) {
    $('.user-name').empty();
    $('#manager-past-bookings tr').empty();
    $('.user-name').append(`${user.name.toUpperCase()} Total Amount Spent: $${amountSpent}`)
    userBookings.map(booking => {
      $('#manager-past-bookings').append(
        `<tr>
          <td>${booking.roomNumber}</td>
          <td>${booking.date}</td>
          <td>${user.calculateAmountByBooking(booking, roomsData)}</td>
        </tr>`
      )
    });
  },

  displayManagerInfo(revenueForToday, percentageCapacity) {
    $('.percent-booked').append(`Hotel is at ${percentageCapacity}% Capacity Today`);
    $('.revenue-today').append(`Today's Revenue is $${revenueForToday}`)
  },

  displayUsers(userData) {
    $('.manager-page').toggleClass('hidden');
    $('.manager-search').toggleClass('hidden');
    userData.map(user => {
      $('.user-display').append(`
        <section class="user-card" data-id="${user.id}">
          <h3 class="user-card-header" data-id="${user.id}">${user.name.toUpperCase()}</h3>
      </section>`);
    });
  },

  searchUsers(name, userData) {
    userData.forEach(user => {
      let userName = user.name.toUpperCase();
      if (userName.includes(`${name}`)) {
        this.showUser(user.id);
      } else {
        this.hideUser(user.id);
      }
    });
  },

  showUser(userId) {
    $(`.user-card[data-id="${userId}"]`).removeClass('hidden')
  },

  hideUser(userId) {
    $(`.user-card[data-id="${userId}"]`).addClass('hidden')
  },

  displayUserPage(user, amountSpent) {
    $
    $('.manager-search').toggleClass('hidden');
    $('.manage-user').toggleClass('hidden');
  },

  displayRooms(type, roomsToDisplay, roomsData) {
    $('.roomcard').each(function() {
      $(this).append('')
    });
    let rooms = [];
    roomsToDisplay.forEach(room => {
      if (room.roomType == type) {
        rooms.push(room)
      }
    });
    $('#insert-results-here').empty()
    rooms.map(room => {
      $(`${'#insert-results-here'}`).append(
        `<section class="room-card-${room.roomType.replace(' ', '-')} roomcard" data-id="${room.number}">
        <section class="room-info">
          <h3 class="room-card-header">${room.roomType.toUpperCase()} No. ${room.number} Cost Per Night: $${room.costPerNight}</h3>
        <section class="room-icons">
        </section>
        </section>
      </section>`);
    });
  },

  displayAllAvailableRooms(rooms) {
    $('#insert-results-here').empty()
    rooms.map(room => {
      $('#insert-results-here').append(
        `<section class="room-card-${room.roomType.replace(' ', '-')} roomcard" data-id="${room.number}">
        <section class="room-info">
          <h3 class="room-card-header">${room.roomType.toUpperCase()} No. ${room.number} Cost Per Night: $${room.costPerNight}</h3>
        <section class="room-icons">
        </section>
        </section>
      </section>`);
    });
  },

  displayBookingCard(currentRoom) {
    $('.booking-card-container').toggleClass('hidden');
    $('#room-type-li').append(`Room Type: ${currentRoom.roomType.toUpperCase()}`);
    $('#number-beds').append(`Number of Beds: ${currentRoom.numBeds}`);
    $('#bed-size').append(`Bed Size: ${currentRoom.bedSize.toUpperCase()}`);
    $('#cost-per-night').append(`Cost Per Night: $${currentRoom.costPerNight}`);
  },

  clearBookingCard() {
    $('.booking-card-container').toggleClass('hidden');
    $('.booking-info').each(function() {
      $(this).empty()
    });
  },


  displayUpcomingReservations(futureReservations, user, roomsData) {
    $('.bookings-main').toggleClass('hidden');
    $('.future-reservations-page').toggleClass('hidden');
    $('.main-page-user').toggleClass('hidden');
    futureReservations.map(booking => {
      $('#insert-future-table-results').append(
        `<tr>
          <td>${booking.roomNumber}</td>
          <td>${booking.date}</td>
          <td>${user.calculateAmountByBooking(booking, roomsData)}</td>
        </tr>`
      )
    });
  },

  toggleFutureReservationsPage() {
    $('#insert-table-results tr').remove();
    $('.bookings-main').toggleClass('hidden');
    $('.future-reservations-page').toggleClass('hidden');
    $('.main-page-user').toggleClass('hidden');
  },

  togglePastToUpcoming(futureReservations, user, roomsData) {
    $('#insert-table-results tr').remove();
    $('#insert-future-table-results tr').remove();
    $('.past-reservations-page').toggleClass('hidden');
    $('.future-reservations-page').toggleClass('hidden');
    futureReservations.map(booking => {
      $('#insert-future-table-results').append(
        `<tr>
          <td>${booking.roomNumber}</td>
          <td>${booking.date}</td>
          <td>${user.calculateAmountByBooking(booking, roomsData)}</td>
        </tr>`
      )
    });
  },

  displayPastFromFuture(userBookings, amountSpent, roomsData, user) {
    $('#insert-table-results tr').remove();
    $('#insert-future-table-results tr').remove();
    this.showPastReservations(userBookings, amountSpent, roomsData, user)
  },

  toggleMainFromPast() {
    $('.bookings-main').toggleClass('hidden');
    $('.past-reservations-page').toggleClass('hidden');
    $('.main-page-user').toggleClass('hidden');
  },

  toggleCancelationCard(upcomingBookings) {
    $('#manager-user-future-bookings tr').remove();
    $('.manager-card-container-cancel').toggleClass('hidden');
    upcomingBookings.forEach(booking => {
      $('#manager-user-future-bookings').append(
        `<tr>
          <td>${booking.roomNumber}</td>
          <td>${booking.date}</td>
          <td>${booking.id}</td>
          <td class="cancel-booking-item"><img class="cancel-btn" data-id="${booking.id}" src="./images/cancel-btn.png"></td>
      </tr>`
      );
    });
  },

  toggleCancelationCard(upcomingBookings) {
    $('#manager-user-future-bookings tr').remove();
    $('.manager-card-container-cancel').toggleClass('hidden');
    upcomingBookings.forEach(booking => {
      $('#manager-user-future-bookings').append(
        `<tr>
          <td>${booking.roomNumber}</td>
          <td>${booking.date}</td>
          <td>${booking.id}</td>
          <td class="cancel-booking-item"><img class="cancel-btn" data-id="${booking.id}" src="./images/cancel-btn.png"></td>
      </tr>`
      );
    });
  },

  closeCancelationCard() {
    $('.manager-card-container-cancel').toggleClass('hidden');
  },

  closeCancelationCardFromBooking() {
    $('.manager-card-container-booking').toggleClass('hidden');
  },

  returnToUsers() {
    $('.manager-search').toggleClass('hidden');
    $('.manage-user').toggleClass('hidden');
  },

  managerBookingCard(availableRooms, user) {
    $('#manager-user-booking-table td').remove();
    $('.manager-card-container-booking').toggleClass('hidden');
    availableRooms.forEach(room => {
      $('#manager-user-booking-table').append(
        `
        <tr>
          <td>${room.number}</td>
          <td>${room.numBeds}</td>
          <td>${room.bedSize}</td>
          <td>$${room.costPerNight}</td>
          <td class="cancel-booking-item"><img class="booking-btn" data-id="${room.number}" src="./images/booking.png"></td>
      </tr>`
      );
    });
  }


}
export default domUpdates;
