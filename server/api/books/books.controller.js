'use strict';

var _ = require('lodash');
var Books = require('./books.model');

// Get list of bookss
exports.index = function(req, res) {
  Books.find(function (err, books) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(books);
  });
};

// Get a single books
exports.show = function(req, res) {
  Books.findById(req.params.id, function (err, books) {
    if(err) { return handleError(res, err); }
    if(!books) { return res.status(404).send('Not Found'); }
    return res.json(books);
  });
};

// Creates a new books in the DB.
exports.create = function(req, res) {
  Books.find(function (err, books) {
    console.log("In Books. Find");
    console.log(books);
    console.log(req.body.link);
    if(err) { return handleError(res, err); }
    if (books.length !== 0) {
      for (var i = 0; i < books.length; i++) {
        if (books[i].book[0].thumbnail === req.body.thumbnail) {
          return res.status(500).send('That book has already been added!');
        }
      }
    }
    console.log("Still Running");
    var newBook = new Books({
      book: req.body,
      comments: [],
      ratings: []
    });
    newBook.save(function(err) {
      if (err) return validationError(res, err);
      res.status(200).send('OK');
    });
  });
};

// Updates an existing books in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Books.findById(req.params.id, function (err, books) {
    if (err) { return handleError(res, err); }
    if(!books) { return res.status(404).send('Not Found'); }
    var updated = _.merge(books, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(books);
    });
  });
};

// Deletes a books from the DB.
exports.destroy = function(req, res) {
  Books.findById(req.params.id, function (err, books) {
    if(err) { return handleError(res, err); }
    if(!books) { return res.status(404).send('Not Found'); }
    books.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}