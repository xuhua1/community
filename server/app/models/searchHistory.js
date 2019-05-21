'use strict'

const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

/**
 * 搜索历史
 */
let searchSchema = new Schema({
  userId: { type: String, required: true },
  searchValue: { type: String, required: true },

  meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date } }
});

/**
 * 保存之前的钩子
 */
searchSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = Date.now();
  } else {
    this.meta.createdAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('SearchHistory', searchSchema);