"use strict"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Book', new Schema({
    'uploaderUsername': String,
    'uploaderUserId': String,
    'fileId': [],
    'bookName': String,
    'pageCount': Number,
    'showable': Boolean,
    'favoriteCount': Number,
    'uploadDate': Date
}));