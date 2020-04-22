import {
  expect
} from 'chai';

import Bookings from '../src/bookings';
import Rooms from '../src/rooms';
import User from '../src/user';

import domUpdates from '../domUpdates'

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
