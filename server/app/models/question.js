'use strict'

const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

/**
 * 搜索回答
 */
let questionSchema = new Schema({
  userId: { type: String, required: true },
  label: [String],
  oneWord: { type: String, required: true },
  inDetail: { type: String, required: true },
  urlList: [String],
  meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date } }
});

/**
 * 保存之前的钩子
 */
questionSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = Date.now();
  } else {
    this.meta.createdAt = Date.now();
  }
  next();
});



module.exports = mongoose.model('Question', questionSchema);