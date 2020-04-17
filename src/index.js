import datepicker from 'js-datepicker'
import $ from 'jquery';
import Bookings from './Bookings';
import User from './User';
import Rooms from './Rooms'

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/history.png'
import './css/base.scss';
import domUpdates from './domUpdates';
import scripts from './scripts'

let userData;
let bookingsData;
let roomsData;
let bookings;
let rooms;

function fetchData() {
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
}

fetchData().then(data => {
    userData = data.users;
    bookingsData = data.bookings;
    roomsData = data.rooms;
  }).then(function() {
    sortData(userData, bookingsData, roomsData)
  })
  .catch(error => console.log(error.message))

function sortData(userData, bookingsData, roomsData) {
  index.loadData(userData, bookingsData, roomsData);
}
const index = {
  userData: {},
  loadData(userData, bookingsData, roomsData) {
    this.userData = userData;
     bookings = new Bookings(bookingsData);
     rooms = new Rooms(roomsData);
  },
  createUser(user) {
    currentUser = new User(user);
  }
}

$('#toggle-manager-log-in').on('click', function (event) {
  $('.log-in-container').toggleClass('hidden');
  $('.log-in-container-manager').toggleClass('hidden');
});

$('#toggle-user-log-in').on('click', function (event) {
  $('.log-in-container').toggleClass('hidden');
  $('.log-in-container-manager').toggleClass('hidden');
});

const searchDate = datepicker('#user-datepicker', {
  formatter: (input, date, instance) => {
    const value = date.toISOString().slice(0, 10).replace(/-/g, "/");
    input.value = value;
  }
});

$('.search-date').on('click', function(event) {
  if($('#user-datepicker').val()) {
    let selectedDate = $('#user-datepicker').val();
    $('.bookings-main').toggleClass('hidden');
  }
})

export default index;

// export default index;
