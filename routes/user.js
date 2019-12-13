var express = require('express');
var router = express.Router();

var User = require('../models/User')
var passport = require('passport')
LocalStrategy = require('passport-local').Strategy


passport.use('local.register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err) }
      if (user) {
        return done(null, false, { message: 'User already exist.' });
      }
      const newUser = new User;

      newUser.email = email
      newUser.password = password

      newUser.save(function (err, user) {
        if (err) { return done(err); }

        return done(null, user);
      })
    })
  })
)

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Authentification' });
});
router.get('/signin', function (req, res, next) {
  res.render('user/signin', { title: 'Login' });
});
router.get('/account', function (req, res, next) {
  res.render('user/account', { title: 'Account' });
});
router.get('/register', function (req, res, next) {
  res.render('user/register', { title: 'Register' });
});

router.post('/signin', function (req, res, next) {
  res.send(req.body)
});

router.post('/register', passport.authenticate('local.register', {
  successRedirect: '/user/account',
  failureRedirect: '/user/register',
})
)

module.exports = router;
