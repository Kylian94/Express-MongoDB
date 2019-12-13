var express = require('express');
var router = express.Router();

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

router.post('/register', function (req, res, next) {
  res.send(req.body)
})

module.exports = router;
