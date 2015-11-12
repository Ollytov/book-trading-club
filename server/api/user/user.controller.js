'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var moment = require('moment');

var books = require('google-books-search');

var validationError = function(res, err) {
  return res.status(422).json(err);
};




exports.searchbooks = function(req, res) {
  books.search(req.params.name, function(error, results) {
    if ( ! error ) {
        res.status(200).json(results);
    } else {
        console.log(error);
    }
});
};


exports.addbook = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (user.books.length !== 0) {
      for (var i = 0; i < user.books.length; i++) {
        if (user.books[i].book[0].thumbnail === req.body.book[0].thumbnail) {
            return res.status(500).send('That book has already been added!');
        }
      }
    }
    User.findByIdAndUpdate(req.params.id, {$push: {books: req.body}}, function(err, data) {
        if (err) return res.status(500).send(err);
        res.status(200).send("Ok");
    });
  });
}

exports.findUser = function(req, res) {
  User.findOne({
    username: req.params.name
  }, function(err, user) {
    if (err) return res.status(500).send(err);
    res.json(user);
  });
}

exports.getFavorites = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    res.status(200).send(user.books);
  })
}


exports.removefavorite = function(req, res, next) {
  User.findByIdAndUpdate(req.params.userid, {$pull : {books : { _id : req.params.bookid }}}, function(err, data) {
    if (err) return res.status(500).send(err);
    res.status(200).send("Ok");
  });
}


/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  req.body.username = req.body.username.toLowerCase();
  var newUser = new User(req.body);

  newUser.date = moment(Date.now()).format('MMMM Do YYYY');
  newUser.state = '';
  newUser.city = '';
  newUser.books = [];
  newUser.favgenre = '';
  newUser.favauthor = '';
  newUser.favbook = '';
  newUser.favseries = '';
  newUser.desc = '';
  newUser.profileimage = 'assets/images/default-profile-image.png';
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    //if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};


/**
 * Change a users information
 */
exports.changeInformation = function(req, res, next) {
  var userId = req.user._id;
  User.findById(userId, function (err, user) {
    if (req.body.favgenre) {
      user.favgenre = req.body.favgenre.$viewValue;
    }
    if (req.body.favauthor) {
      user.favauthor = req.body.favauthor.$viewValue;
    }
    if (req.body.favbook) {
      user.favbook = req.body.favbook.$viewValue;
    }
    if (req.body.favseries) {
      user.favseries = req.body.favseries.$viewValue;
    }
    if (req.body.country) {
      user.country = req.body.country.$viewValue;
    }
    if (req.body.state) {
      user.state = req.body.state.$viewValue;
    }
    if (req.body.city) {
      user.city = req.body.city.$viewValue;
    }
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.status(200).send('OK');
    });
  });
};


/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
