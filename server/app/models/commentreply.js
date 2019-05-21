'use strict'

const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

/**
 * 搜索历史
 */
let commentReplySchema = new Schema({
  userId: { type: String, required: true },
  toUserId: { type: String, required: true },
  commentId: { type: String, required: true },
  commentValue: { type: String, default: '' },

  meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date } }
});

/**
 * 保存之前的钩子
 */
commentReplySchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = Date.now();
  } else {
    this.meta.createdAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('CommentReply', commentReplySchema);