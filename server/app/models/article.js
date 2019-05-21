'use strict'

const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

/**
 * 搜索历史
 */
let articleSchema = new Schema({
  userId: { type: String, required: true },
  articleTitle: { type: String },
  articleType: { type: String, default: "richEditor" },
  abstract: { type: String },
  articleValue: { type: String, required: true },
  commentNum: { type: Number, default: 0 },
  likeNum: { type: Number, default: 0 },
  type: { type: String },
  meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date } }
});

/**
 * 保存之前的钩子
 */
articleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = Date.now();
  } else {
    this.meta.createdAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Article', articleSchema);