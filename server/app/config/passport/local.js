'use strict';

/**
 * Module dependencies.
 */

const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

/**
 * Expose
 */

module.exports = new LocalStrategy(
  {
    usernameField: 'phone',
    passwordField: 'password'
  },
  function (phone, password, done) {
    const options = {
      criteria: { phone: phone },
      select: 'phone hashed_password salt'
    };
    User.load(options, function (err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
);
