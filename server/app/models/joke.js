'use strict'

const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

let jokeSchema = new Schema({
  joke: { type: String }
});

module.exports = mongoose.model('Joke', jokeSchema);