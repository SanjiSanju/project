var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {

var patid = req.body.patid;
var patname = req.body.patname;

console.log(patid + " " + patname);
console.log("Login Sucessfully ");

  res.render('index');
});

router.get('/new', function(req, res, next) {
  res.render('signup');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/doctor', function(req, res, next) {
  res.render('doctor');
});
router.get('/department', function(req, res, next) {
  res.render('department');
});
router.get('/pricing', function(req, res, next) {
  res.render('pricing');
});
router.get('/blog', function(req, res, next) {
  res.render('blog');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;

