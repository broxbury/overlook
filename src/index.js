import datepicker from 'js-datepicker';
import $ from 'jquery';
import Bookings from './Bookings';
import User from './User';
import Rooms from './Rooms'

import './css/base.scss';
import './images/hotel.png';
import './images/history.png';
import './images/booking.png';
import './images/cancel-btn.png';
import './css/base.scss';
import domUpdates from './domUpdates';
import scripts from './scripts';

let userData;
let bookingsData;
let roomsData;
let bookings;
let rooms;
let user;
let selectedDate;
let roomCardId;
let managerSelectedDate;
let dateToday;


const index = {
  fetchData() {
    let fetchedUserData =
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
      .then(response => response.json());

    let fetchedBookingsData =
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
      .then(response => response.json());

    let fetchedRoomData =
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
      .then(response => response.json());

    return Promise.all([fetchedUserData, fetchedBookingsData, fetchedRoomData])
      .then(response => {
        let dataObj = {};
        dataObj.users = response[0].users;
        dataObj.bookings = response[1].bookings;
        dataObj.rooms = response[2].rooms;
        // console.log(dataObj);
        return dataObj;
      });
  },

  userData: {},
  loadData(userData, bookingsData, roomsData) {
    this.userData = userData;
    bookings = new Bookings(bookingsData);
    rooms = new Rooms(roomsData);
  },

  createUser(userName) {
    let userID;
    if (userName.length === 9) {
      userID = +userName.slice(-1)
    }
    if (userName.length === 10) {
      userID = +userName.slice(-2);
    }
    let newUser = userData.find(user => user.id === userID)
    user = new User(newUser);
  },

  addAvailableRoomsInfo(date, pageToDisplay) {
    domUpdates.makeResultsCardsHTML(rooms.getAvailableRoomsByDate(date, bookingsData), pageToDisplay)
  },

  stageUserBooking(selectedDate, user, roomCardId) {
    let bookingDate = selectedDate;
    let bookingForm = {
      userID: user.id,
      date: bookingDate,
      roomNumber: Number(roomCardId)
    }
    return bookingForm;
  },

  postBooking(bookingForm) {
    let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings'
    fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingForm),
      })
      .then(response => response.json())
      .then(result => console.log(result))
      .then(alert("Your Booking Was successful!"))
      .catch(err => console.log(err))

  },

  confirmCancelationStage(bookingId) {
    let bookingToCancel = {
      id: Number(bookingId)
    }
    this.deleteBooking(bookingToCancel)
  },

  deleteBooking(bookingToCancel) {
    let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings'
    fetch(url, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingToCancel)
      })
      .then(response => response.json())
      .then(result => console.log(result))
      .then(alert("The Reservation was Cancelled"))

      .catch(err => console.log(err))
  }
}

index.fetchData().then(data => {
    userData = data.users;
    bookingsData = data.bookings;
    roomsData = data.rooms;
  }).then(function() {
    index.loadData(userData, bookingsData, roomsData)
  })
  .catch(error => console.log(error.message))

$('#toggle-manager-log-in').on('click', function(event) {
  domUpdates.toggleManagerLogIn();
});

$('#toggle-user-log-in').on('click', function(event) {
  domUpdates.toggleUserLogIn();
});

const searchDate = datepicker('#user-datepicker', {
  formatter: (input, date, instance) => {
    const value = date.toISOString().slice(0, 10).replace(/-/g, "/");
    input.value = value;
  }
});

const managerSearchDate = datepicker('#manager-datepicker', {
  formatter: (input, date, instance) => {
    const value = date.toISOString().slice(0, 10).replace(/-/g, "/");
    input.value = value;
  }
});

$('.search-date').on('click', function(event) {
  if ($('#user-datepicker').val()) {
    let pageToDisplay = '.search-results-cards'
    selectedDate = $('#user-datepicker').val();
    index.addAvailableRoomsInfo(selectedDate, pageToDisplay)
  }
});

$('.log-in-btn').on('click', function(event) {
  dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  domUpdates.verifyUserSignIn($('.user-name-input').val(), $('.password-input').val());
});

$('#user-main-page-history').on('click', function(event) {
  user.populateUserBookings(bookingsData);
  domUpdates.togglePastFromMain(user.filterPastBookings(dateToday), user.calculateUserSpending(roomsData), roomsData, user);
});

$('.log-in-btn-manager').on('click', function(event) {
  dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  let pageToDisplay = '.manager-available-rooms';
  domUpdates.verifyManager($('.user-name-input-manager').val(), $('.password-input-manager').val());
  index.addAvailableRoomsInfo(dateToday, pageToDisplay);
  domUpdates.displayManagerInfo(bookings.calculateRevenueByDate(dateToday, roomsData), bookings.calculateBookingPercentage(dateToday, roomsData));
});

$('#find-user').on('click', function(event) {
  domUpdates.displayUsers(userData);
});

$('#search').on('input', function(event) {
  domUpdates.searchUsers($('#search').val().toUpperCase(), userData)
});

$('.manager-search-container').on('click', function(event) {
  let userId = event.target.dataset.id;
  if (event.target.classList.contains('user-card-header')) {
    user = new User(userData.find(user => user.id == userId));
    domUpdates.displayUserPage(user, user.calculateUserSpending(roomsData));
    domUpdates.showPastReservationsForManager(user.populateUserBookings(bookingsData), user.calculateUserSpending(roomsData), roomsData, user)
  }
});

$('.search-results-cards').on('click', function(event) {
  roomCardId = event.target.dataset.id;
  if (event.target.classList.contains('roomcard')) {
    index.stageUserBooking(selectedDate, user, roomCardId);
  }
});

$('#suite').on('click', function(event) {
  let type = 'suite'
  let availableRooms = rooms.getAvailableRoomsByDate(selectedDate, bookingsData)
  let roomsToDisplay = rooms.filterRoomsByType(availableRooms, type);
  domUpdates.displayRooms(type, roomsToDisplay, roomsData)
  domUpdates.toggleActiveBtnState(event.target.id);
});

$('#junior-suite').on('click', function(event) {
  let type = 'junior suite'
  let availableRooms = rooms.getAvailableRoomsByDate(selectedDate, bookingsData)
  let roomsToDisplay = rooms.filterRoomsByType(availableRooms, type);
  domUpdates.displayRooms(type, roomsToDisplay, roomsData)
  domUpdates.toggleActiveBtnState(event.target.id);

});

$('#single-room').on('click', function(event) {
  let type = 'single room'
  let availableRooms = rooms.getAvailableRoomsByDate(selectedDate, bookingsData)
  let roomsToDisplay = rooms.filterRoomsByType(availableRooms, type);
  domUpdates.displayRooms(type, roomsToDisplay, roomsData)
  domUpdates.toggleActiveBtnState(event.target.id);

});

$('#residential-suite').on('click', function(event) {
  let type = 'residential suite'
  let availableRooms = rooms.getAvailableRoomsByDate(selectedDate, bookingsData)
  let roomsToDisplay = rooms.filterRoomsByType(availableRooms, type);
  domUpdates.displayRooms(type, roomsToDisplay, roomsData)
  domUpdates.toggleActiveBtnState(event.target.id);

});

$('#show-all').on('click', function(event) {
  domUpdates.displayAllAvailableRooms(rooms.getAvailableRoomsByDate(selectedDate, bookingsData));
  domUpdates.toggleActiveBtnState(event.target.id);
});

$('.search-results-cards').on('click', function(event) {
  let roomId = event.target.dataset.id;
  let currentRoom = rooms.getRoomById(roomId);
  domUpdates.displayBookingCard(currentRoom)
});

$('#hide-room-card').on('click', function(event) {
  domUpdates.clearBookingCard();
});

$('#book-now-user').on('click', function(event) {
  index.postBooking(index.stageUserBooking(selectedDate, user, roomCardId));
});

$('#upcoming-reservations-main').on('click', function(event) {
  dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  user.populateUserBookings(bookingsData);
  domUpdates.displayUpcomingReservations(user.filterUpcomingBookings(dateToday), user, roomsData)
});

$('#upcoming-from-past').on('click', function(event) {
  dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  domUpdates.togglePastToUpcoming(user.filterUpcomingBookings(dateToday), user, roomsData)
});

$('#return-to-main').on('click', function(event) {
  domUpdates.toggleFutureReservationsPage();
});

$('#upcoming-to-past').on('click', function(event) {
  user.populateUserBookings(bookingsData)
  domUpdates.displayPastFromFuture(user.filterPastBookings(dateToday), user.calculateUserSpending(roomsData), roomsData, user);
  domUpdates.toggleFutureFromPast();

});

$('#user-reservations-bookings').on('click', function(event) {
  domUpdates.toggleMainFromPast();
});

$('#cancel-booking').on('click', function(event) {
  let dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  user.populateUserBookings(bookingsData);
  domUpdates.toggleCancelationCard(user.filterUpcomingBookings(dateToday));
});

$('#manager-user-future-bookings').on('click', function(event) {
  let bookingId = event.target.dataset.id
  if (event.target.classList.contains('cancel-btn')) {
    index.confirmCancelationStage(event.target.dataset.id);
    domUpdates.closeCancelationCard();
  }
});

$('#back-to-users').on('click', function(event) {
  domUpdates.closeCancelationCard();
});

$('#back-to-users-from-bookings').on('click', function(event) {
  domUpdates.closeCancelationCardFromBooking();
});

$('#return-to-users-page').on('click', function(event) {
  domUpdates.returnToUsers();
});

$('#book-user').on('click', function(event) {
  if ($('#manager-datepicker').val()) {
    managerSelectedDate = $('#manager-datepicker').val();
    domUpdates.managerBookingCard(rooms.getAvailableRoomsByDate(managerSelectedDate, bookingsData), user)
  }
});

$('#manager-user-booking-table').on('click', function(event) {
  let roomId = event.target.dataset.id
  if (event.target.classList.contains('booking-btn')) {
    index.postBooking(index.stageUserBooking(managerSelectedDate, user, roomId));
    domUpdates.closeCancelationCardFromBooking();
  }
});

$('#todays-bookings-from-user-portal').on('click', function(event) {
  domUpdates.returnToManagerMain();
});

$('#return-to-manager-home').on('click', function(event) {
  domUpdates.returnToManagerMainFromUserDetails();
});

$('#return-to-date-select').on('click', function(event) {
  domUpdates.returnToDateSelect();
})







export default index;
