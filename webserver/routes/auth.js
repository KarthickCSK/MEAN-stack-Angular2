var express = require('express');
var User = require('../models/user');
var router = express.Router();
var passport=require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var nodemailer = require('nodemailer');

// loading up the configuration file containing facebook and goole authentication configuration
var configAuth = require('../config/auth');
var rand;

router.get('/login',
  passport.authenticate('local'),
  function(req ,res)
  {
    console.log(req.user);
    res.cookie('token', req.user.token);
    res.cookie('authType', req.user.authType);
    res.cookie('username', req.user.username);
    res.json(
      {
      status:"success",
      userData:req.user
      }
    );
});

router.get('/logout', 
  function(req, res) 
  {
    req.logout();
    res.clearCookie('token');
    res.clearCookie('authType');
    res.clearCookie('userType');
    res.clearCookie('gender');
    res.clearCookie('photos');
    res.clearCookie('email');
    res.clearCookie('username');
    res.json({logout:"Successfully LogOut"});
  });

 // *******************************************
   // Facebook authentication routes
   // *******************************************
   // send to facebook to do the authentication

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }) ,
  (req, res) =>
  {
  console.log('came/facebook')
    res.json(req.user);
  });

  // handle the callback after facebook has authenticated the user
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/#/' }), 
  (req, res) =>
  {
    console.log('came/facebook/callback')
    res.cookie('token', req.user.facebook.token);
    res.cookie('authType', req.user.facebook.authType);
    res.cookie('userType', 'Customer');
    res.cookie('username',req.user.facebook.name);
    res.cookie('email',req.user.facebook.email);
    res.cookie('gender',req.user.facebook.gender);
    res.cookie('photos',req.user.facebook.photo);
    res.redirect('http://localhost:4200/home');

  });
// *******************************************
// Google authentication routes
// *******************************************
//  send to google to do the authentication
router.get('/google', passport.authorize('google', { scope: ['profile', 'email'] }) ,
  (req, res) =>
  {
    res.json(req.user);
  });

// the callback after google has authorized the user
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/#/' }), 
  (req, res) =>
  {
    res.cookie('token', req.user.google.token);
    res.cookie('authType', req.user.google.authType);
    res.cookie('userType', 'Customer');
    res.cookie('username',req.user.google.name);
    res.cookie('email',req.user.google.email);
    res.cookie('gender',req.user.google.gender);
    res.cookie('photos',req.user.google.photo);
    res.redirect('http://localhost:4200/home');
  });

router.get('/userinfo',  
  function(req, res)
  {
    console.log("userinfo called");
    console.log(req.user);
    res.json({user : req.user});
  });


  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    return next();
    res.redirect('/#/');
  }
  
module.exports = router;
