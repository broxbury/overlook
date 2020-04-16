// import './css/base.scss';
// import index from './index':
// // fetchUserData();
// let userData;
// let bookingsData;
// let roomsData;
//
//
// function fetchData() {
//   // let fetchedUserData =
//     fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
//       .then(response => response.json());
//
//   let fetchedBookingsData =
//     fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
//       .then(response => response.json());
//
//   let fetchedRoomData =
//     fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
//       .then(response => response.json());
//
//   return Promise.all([fetchedUserData, fetchedBookingsData, fetchedRoomData])
//     .then(response => {
//       let dataObj = {};
//       dataObj.users = response[0].users;
//       dataObj.bookings = response[1].bookings;
//       dataObj.rooms = response[2].rooms;
//       console.log(dataObj);
//       return dataObj;
//     });
// }
//
// fetchData().then(data => {
//     userData = data.users;
//     bookingsData = data.bookings;
//     roomsData = data.rooms;
//   }).then(function() {
//     logData(userData, bookingsData, roomsData)
//   })
//   .catch(error => console.log(error.message))
