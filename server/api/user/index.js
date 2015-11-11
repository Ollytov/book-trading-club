'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/find/user/:name', controller.findUser);
router.get('/find/books/:id', controller.getFavorites);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/profile-edit', auth.isAuthenticated(), controller.changeInformation);
router.post('/addbook/:id', auth.isAuthenticated(), controller.addbook);
router.post('/remove/:userid/:bookid', controller.removefavorite);
router.get('/search/:name', controller.searchbooks)

module.exports = router;
