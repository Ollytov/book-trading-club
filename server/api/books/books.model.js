'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BooksSchema = new Schema({
  book: Array,
  comments: Array
});

module.exports = mongoose.model('Books', BooksSchema);