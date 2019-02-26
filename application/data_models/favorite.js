"use strict"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Favorite', new Schema({
    'username': String,
    'userId': String,
    'bookId': String,
    'favoriteDate': Date
}));