'use strict'

const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

/**
 * 搜索历史
 */
let uploadCommentSchema = new Schema({
  userId: { type: String, required: true },
  uploadId: { type: String, required: true },
  uploadValue: { type: String, default: '' },
  meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date } }
});

/**
 * 保存之前的钩子
 */
uploadCommentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = Date.now();
  } else {
    this.meta.createdAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('UploadComment', uploadCommentSchema);