'use strict';

const co = require('co');
const User = require('../models/user');

/**
 * 登陆验证用户存在并加入req
 */
exports.load = co.wrap(function* (req, res, next, _id) {
  const criteria = { _id };
  try {
    req.profile = yield User.load({ criteria });
    if (!req.profile) return next(new Error('User not found'));
  } catch (err) {
    return next(err);
  }
  next();
});

/**
 * add one user
 */
exports.add = (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(function (data) {
      res.send({
        success: true,
        data
      });
    }).catch(function (e) {
      res.send({
        success: false,
        message: e.message
      });
    });
};

/**
 * update one user
 */
exports.update = (req, res) => {
  User.findByIdAndUpdate(req.body.userId, req.body, (error, result) => {
    if (error) {
      res.send({
        success: false
      })
    } else {
      res.send({
        success: true,
        data: result,
      });
    }
  })
}

/**
 * find one by id
 */

exports.findOneById = (req, res) => {
  User.findById(req.query.userId, 'nickname avatar userSign email', (err, result) => {
    if (err) {
      res.send({
        success: false,
        message: err
      })
    } else {
      res.send({
        success: true,
        data: result
      });
    }
  });
}

/**
 * find arr by arr
 */
exports.findByArr = co.wrap(
  function* (req, res) {
    const userArr = req.body.userArr;
    try {
      let userProArr = [];
      userArr.forEach(item => {
        const userPro = User.findById(item).select('nickname avatar').exec();
        userProArr.push(userPro);
      });
      const result = yield Promise.all(userProArr);
      res.send({
        success: true,
        data: result,
      })
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      })
    }
  }
);

exports.findAll = co.wrap(
  function* (req, res) {
    try {
      const userPro = yield User.find({}).select('nickname avatar').exec();
      res.send({
        success: true,
        data: userPro,
      })
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      })
    }
  }
);


