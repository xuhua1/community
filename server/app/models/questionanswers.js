'use strict'

const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;
/**
 * 回答子文档
 */
let answerSchema = new Schema({
  userId: { type: String, required: true },
  questionId: { type: String, required: true },
  answerValue: { type: String, required: true },
  likeNum: { type: Number, default: 0 },
  disLikeNum: { type: Number, default: 0 },
  meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date } }
});

/**
 * answer保存之前的钩子
 */
answerSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = Date.now();
  } else {
    this.meta.createdAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Answer', answerSchema);