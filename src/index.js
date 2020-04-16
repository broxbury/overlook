// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './css/base.scss';
// fetchUserData();
let userData;
let bookingsData;
let roomsData;

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

console.log('This is the JavaScript entry file - your code begins here.');


function sortData(userData, bookingsData, roomsData) {
  console.log(userData, bookingsData, roomsData);

}
const index = {
  userData: {},

}

export default index;

// export default index;
