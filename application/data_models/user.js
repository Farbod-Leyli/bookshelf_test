"use strict"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    'username': String,
    'password': String,
    'email': String,
    'lastLogDate': Date,
    'bookCount': Number,
    'favoriteCount': Number
}));