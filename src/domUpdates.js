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
        <section class="room-icons">
          <img class="breakfast-img" src="../images/breakfast.png">
          <img class="breakfast-img" src="../images/hotel.png">
        </section>
        </section>
      </section>`);
    });
  },

  showPastReservations(userBookings, amountSpent, roomsData, user) {
    $('.bookings-main').toggleClass('hidden');
    $('.reservations-page').toggleClass('hidden');
    $('.main-page-user').toggleClass('hidden');
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
    $('.user-name').append(`${user.name.toUpperCase()} Total Amount Spent: $${amountSpent}`)
    userBookings.map(booking => {
      $('.past-bookings').append(
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
          <h3 class="room-card-header">${room.roomType.toUpperCase()} No. ${room.number}</h3>
        <section class="room-icons">
          <img class="breakfast-img" src="../images/breakfast.png">
          <img class="breakfast-img" src="../images/hotel.png">
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
          <h3 class="room-card-header">${room.roomType.toUpperCase()} No. ${room.number}</h3>
        <section class="room-icons">
          <img class="breakfast-img" src="../images/breakfast.png">
          <img class="breakfast-img" src="../images/hotel.png">
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

  toggleReservationsPage() {
    $('#insert-table-results tr').remove();
    $('.total-cost').empty();
    $('.bookings-main').toggleClass('hidden');
    $('.reservations-page').toggleClass('hidden');
    $('.main-page-user').toggleClass('hidden');
  }


}
export default domUpdates;
