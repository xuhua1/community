'use strict';

/*!
 * Module dependencies.
 */

const local = require('./local');
const User = require('../../models/user');

/**
 * Expose
 */

module.exports = function (passport) {
  // serialize sessions
  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser((id, cb) =>
    User.load({ criteria: { _id: id } }, cb)
  );

  // use these strategies
  passport.use(local);
};
