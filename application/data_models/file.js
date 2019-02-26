"use strict"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('File', new Schema({
    'uploderUsername': String,
    'uploaderUserId': String,
    'uploadDate': String,
    'lastUpdateDate': String,
    'downloadCount': String,
    'fileSize': Number,
    'path': String
}));