var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session= require('express-session');
var expressValidator=require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose= require('mongoose');
var url=require('url');
var async = require('async');
var crypto=require('crypto');
var router = express.Router();

var expressValidator = require('express-validator');
router.use(expressValidator());

var User = require('../models/adminmodel');
var Student=require('../models/patientmodel');
var Teacher=require('../models/usermodel');


//ALL About Login  Routes
router.get('/', function(req, res, next) {
    res.render('slogin');
  });

  router.get('/menu', function(req, res, next) {
    res.render('patient');
  });
  

module.exports = router;
