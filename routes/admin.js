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

var Admin = require('../models/adminmodel');
var User =require('../models/teachermodel');



/* GET users listing. */
router.get('/menu', function(req, res, next) {
 var username=req.user.username;
 console.log('=====>'+ username);
  res.render('admin');
});


//ALL About Login  Routes
router.get('/login', function(req, res, next) {
  res.render('login');
});


router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/admin/login',
    failureFlash: true
  }),
  function(req, res) {
    var username = req.user.username;
    res.redirect('/admin/menu');
    
  });

//All about signup Routes
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // Validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  console.log('------>    ' + username + '  ----->     ' + password);


  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.render('signup', {
      errors: errors
    });
  } else {
    console.log('enter');

    User.find({
      username: username
    }, function(err, results) {
      if (err) return console.error(err);

      console.log(results);
      if (results.length > 0) {
        
        res.redirect('/admin/signup');
        console.log('ok huh');
      } else {
        var newUser = new User({
          username: username,
          password: password
        });

        User.createUser(newUser, function(err, user) {
          if (err) throw err;
          console.log(user);
          console.log('these data is uploaded');
        });

        req.flash('success_msg', 'You are register and can now login');
        res.redirect('/admin/login');
        console.log('Passed');
      }
    });

  }
});


  //res.redirect('login');
router.get('/logout', function(req, res) {
  console.log('We are out of here');
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/admin/login');
});






passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: 'Unknown User'
        });
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Invalid password'
          });
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});










router.get('/addpatient', function(req, res, next) {
  var username=req.user.username;
  console.log('=====>'+ username);
   res.render('addstudent');
 });


router.post('/addpatient', function(req, res, next) {

  var sid=req.body.sid;
  var sname=req.body.sname;
	var spass=req.body.spass;

	console.log(sid+'-'+sname+'-'+spass);

	var query={sid:sid};

	Student.findOneAndUpdate(query, {
    $set: {
      sid:sid,
      spass:spass,
      sname:sname
    }
  }, {
    new: true,
    upsert: true
  }, function(err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }});


  res.render('addpatient');
});


router.get('/patientdetails', function(req, res, next) {

  var username=req.user.username;
  console.log('=====>'+ username);

  Patient.find(function(err,results){
    if (err) return console.error(err);
    else{
      res.render('stable',{info:results});
    }
  });
});


router.get('/patient/edit/:id',function(req,res,next){
  var id = req.params.id;
  var query={_id:id};

    Patient.find(query,
      function(err, results) {
        if (err) throw err;
        console.log(results);
        res.render('updatepatient',{info:results});
    });

});




router.get('/patient/delete/:id',function(req,res,next){
	var id = req.params.id;
  	var query={_id:id};

  	patient.remove({
    	_id: id
  		}, function(err) {
    	if (err) throw err;
    	res.redirect('/admin/patientdetails');
  });
  	
});

router.get('/addusers', function(req, res, next) {
  var username=req.user.username;
  console.log('=====>'+ username);
   res.render('adduser');
 });

router.post('/addusers', function(req, res, next) {

  var tid=req.body.tid;
  var tname=req.body.tname;
	var tpass=req.body.tpass;

	console.log(tid+'-'+tname+'-'+tpass);

	var query={tid:tid};

	User.findOneAndUpdate(query, {
    $set: {
      tid:tid,
      tpass:tpass,
      tname:tname
    }
  }, {
    new: true,
    upsert: true
  }, function(err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }});

  res.render('adduser');
});

router.get('/userdetails', function(req, res, next) {

  var username=req.user.username;
  console.log('=====>'+ username);

  User.find(function(err,results){
    if (err) return console.error(err);
    else{
      res.render('ttable',{info:results});
    }
  });
});



router.get('/user/edit/:id',function(req,res,next){
  var id = req.params.id;
  var query={_id:id};

    User.find(query,
      function(err, results) {
        if (err) throw err;
        console.log(results);
        res.render('updateuser',{info:results});
    });

});




router.get('/user/delete/:id',function(req,res,next){
	var id = req.params.id;
  	var query={_id:id};

  	User.remove({
    	_id: id
  		}, function(err) {
    	if (err) throw err;
    	res.redirect('/admin/userdetails');
  });
  	
});

module.exports = router;
