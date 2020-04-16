import {
  expect
} from 'chai';

import Bookings from '../src/bookings';
import Rooms from '../src/rooms';
import User from '../src/user';


describe('User', function() {
  let user1;
  let user2;
  let users;
  let bookingsData;
  let roomsData;

  beforeEach(function() {

    bookingsData = [{
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2020/02/05",
        "roomNumber": 12,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6x8",
        "userID": 1,
        "date": "2020/01/11",
        "roomNumber": 20,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl727",
        "userID": 1,
        "date": "2020/01/20",
        "roomNumber": 22,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl72h",
        "userID": 1,
        "date": "2020/02/22",
        "roomNumber": 15,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl72f",
        "userID": 4,
        "date": "2020/01/22",
        "roomNumber": 2,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6uf",
        "userID": 2,
        "date": "2020/01/09",
        "roomNumber": 18,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6uy",
        "userID": 2,
        "date": "2020/01/24",
        "roomNumber": 19,
        "roomServiceCharges": []
      }
    ];

    roomsData = [{
        "number": 12,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "twin",
        "numBeds": 2,
        "costPerNight": 172.09
      },
      {
        "number": 20,
        "roomType": "residential suite",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 343.95
      },
      {
        "number": 22,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 350.31
      },
      {
        "number": 15,
        "roomType": "residential suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 1,
        "costPerNight": 294.56
      },
      {
        "number": 2,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 477.38
      },
      {
        "number": 18,
        "roomType": "junior suite",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 2,
        "costPerNight": 496.41
      },
      {
        "number": 19,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 374.67
      }
    ];

    user1 = new User({
      "id": 1,
      "name": "Leatha Ullrich"
    });
    user2 = new User({
      "id": 2,
      "name": "Rocio Schuster"
    });
    users = [user1, user2]
  });

  it('should take in a userId and name', function() {
    expect(user1.id).to.equal(1);
    expect(user1.name).to.equal('Leatha Ullrich')
  });

  it('should create an array of users bookings', function() {
    user1.populateUserBookings(bookingsData);
    expect(user1.bookings).to.deep.equal([{
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2020/02/05",
        "roomNumber": 12,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6x8",
        "userID": 1,
        "date": "2020/01/11",
        "roomNumber": 20,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl727",
        "userID": 1,
        "date": "2020/01/20",
        "roomNumber": 22,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl72h",
        "userID": 1,
        "date": "2020/02/22",
        "roomNumber": 15,
        "roomServiceCharges": []
      }
    ]);
  });

  it('should calculate users total amount spent on bookings', function() {
    user1.populateUserBookings(bookingsData);
    user1.calculateUserSpending(roomsData);
    expect(user1.calculateUserSpending(roomsData)).to.equal(1160.91);
  });

  it('should return a users name, bookings, and total spending', function() {
    user2.populateUserBookings(bookingsData);
    user2.calculateUserSpending(roomsData);
    expect(user2.managerSearchByUser(users, roomsData)).to.eql({
      name: 'Rocio Schuster',
      bookingHistory: [{
          id: '5fwrgu4i7k55hl6uf',
          userID: 2,
          date: '2020/01/09',
          roomNumber: 18,
          roomServiceCharges: []
        },
        {
          id: '5fwrgu4i7k55hl6uy',
          userID: 2,
          date: '2020/01/24',
          roomNumber: 19,
          roomServiceCharges: []
        }
      ],
      amountSpent: 871.08
    });
  });

})