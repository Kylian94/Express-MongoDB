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
      newUser.password = newUser.passwordHash(password)

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

passport.use('local.login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err) }

      if (!user || !user.passwordVerify(password)) {
        return done(null, false, { message: 'User not found' });
      }

      return done(null, user)
    })
  }))

function auth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

function guest(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Authentification' });
});
router.get('/signin', guest, function (req, res, next) {
  res.render('user/signin', { title: 'Login' });
});
router.get('/account', auth, function (req, res, next) {
  res.render('user/account', { title: 'Account' });
});
router.get('/register', guest, function (req, res, next) {
  res.render('user/register', { title: 'Register' });
});
router.get('/logout', auth, function (req, res, next) {
  req.logOut()
  return res.redirect('/')
});

router.post('/register', passport.authenticate('local.login', {
  successRedirect: '/user/account',
  failureRedirect: '/user/register',
}));

router.post('/signin', passport.authenticate('local.register', {
  successRedirect: '/user/account',
  failureRedirect: '/user/signin',
})
)

module.exports = router;
