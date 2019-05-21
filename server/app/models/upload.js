'use strict'

const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: { type: String },
  filename: { type: String },
})
/**
 * 搜索历史
 */
let uploadSchema = new Schema({
  userId: { type: String, required: true },
  label: [String],
  oneWord: { type: String, default: '' },
  inDetail: { type: String, default: '' },
  urlList: [urlSchema],

  meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date } }
});

/**
 * 保存之前的钩子
 */
uploadSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = Date.now();
  } else {
    this.meta.createdAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Upload', uploadSchema);