'use strict'

const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

/**
 * 搜索历史
 */
let imesSchema = new Schema({
  fromId: { type: String, required: true },
  toId: { type: String, required: true },
  isReceive: { type: Boolean, required: true, default: false },
  ImesValue: { type: String, required: true },
  meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date } }
});

/**
 * 保存之前的钩子
 */
imesSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = Date.now();
  } else {
    this.meta.createdAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Imes', imesSchema);