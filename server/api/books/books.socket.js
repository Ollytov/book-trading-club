/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Books = require('./books.model');

exports.register = function(socket) {
  Books.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Books.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('books:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('books:remove', doc);
}