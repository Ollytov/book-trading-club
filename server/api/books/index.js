'use strict';

var express = require('express');
var controller = require('./books.controller');

var router = express.Router();

router.get('/', controller.index);
router.post("/add", controller.create);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);


module.exports = router;