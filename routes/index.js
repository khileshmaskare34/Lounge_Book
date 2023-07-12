var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/get-started', function(req, res, next) {
  res.render('get-started', { title: 'Express' });
});
router.get('/new-user', function(req, res, next) {
  res.render('newuser', { title: 'Express' });
});

module.exports = router;
