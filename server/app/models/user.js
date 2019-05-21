'use strict'

const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const crypto = require('crypto');
/**
 * 用户 Schema
 */
let UserSchema = new Schema({
  //必须
  phone: { type: String, required: true },
  hashed_password: { type: String, required: true },

  nickname: { type: String, default: '未命名' },
  email: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },

  userSign: { type: String, default: '这个人很懒, 什么也没有留下!' },
  avatar: { type: String, default: 'https://upload.jianshu.io/users/upload_avatars/5321383/8fbdf22e-8c08-4213-830f-de4aee61e7f6.png?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240' },
  meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date } }
});

/**
 * 设置虚拟password关联哈希密码
 */
UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this.hashed_password;
  });

/**
 * 存在的电话不能够修改和新增
 */
UserSchema.path('phone').validate(function (phone) {
  return new Promise(resolve => {
    const User = mongoose.model('User');
    // Check only when it is a new user or when phone field is modified
    if (this.isNew || this.isModified('phone')) {
      User.find({ phone }).exec((err, users) => resolve(!err && !users.length));
    } else resolve(true);
  });
}, '电话 `{VALUE}` 已经存在');

/**
 * 保存之前的钩子
 */
UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = Date.now();
  } else {
    this.meta.createdAt = Date.now();
  }
  next();
});


/**
 * UserSchema类实现的方法
 */
UserSchema.methods = {

  /**
   * 设置密钥
   */
  makeSalt () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },

  /**
   * md5 加密密码
   */
  encryptPassword (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (error) {
      return '';
    }
  },

  /**
   * 检查密码是否正确的方法
   */
  authenticate (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
}

/**
 * 静态
 */
UserSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'phone';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

module.exports = mongoose.model('User', UserSchema);