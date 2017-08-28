'use strict';
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// loading up the configuration file containing facebook and goole authentication configuration
var configAuth = require('./auth');

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    console.log("serializeUser");
    done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    console.log("deserializeUser");
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  /*LOCAL LOGIN STRATEGY*/
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  function(req, username, password, done) {
    process.nextTick(function() {
      User.findOne({
        'local.username': username
      }, function(err, user) {
        if (err) {
          return done("Enter Credentials");
        }
        else if (!user) {
          return done("Email ID not registered");
        }
        else if (!(user.local.password === password)) {
          return done('Incorrect password');
        }
        else if(!user.local.verified){
          return done('Email ID is not Verified Check your mail');

        }
        else {
          console.log("Login passport called");
          let userData      = {};
          userData._id      = user._id;
          userData.email    = user.local.email;
          userData.authType = user.local.authType;
          userData.token    = User.generateToken(userData.email);
          userData.username = user.local.username;
          return done(null, userData);
        }
      });
    });
  }));


  // FACEBOOK STRATEGY
  var fbStrategy = configAuth.FACEBOOK;
  fbStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  passport.use(new FacebookStrategy({
    clientID: configAuth.FACEBOOK.clientID,
    clientSecret: configAuth.FACEBOOK.clientSecret,
    callbackURL: configAuth.FACEBOOK.callbackURL,
    profileFields: ['id', 'displayName', 'photos', 'email', 'gender'],
    // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  passReqToCallback: true
  },    
  function(req, token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function() {
      // check if the user is already logged in
      if (!req.user) {
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
          if (err){
              console.log('err');
              return done(err);
          }
          if (user) {
            console.log('user exist');
            // if there is a user id already but no token (user was linked at one point and then removed)
            if (!user.facebook.token) {
              console.log('user exist but no token');
              user.facebook.token    = token;
              user.facebook.gender   = profile._json.gender;
              user.facebook.email    = profile._json.email;
              user.facebook.photo    = profile._json.picture.data.url;
              user.facebook.authType = "facebook";
              user.facebook.name     = profile._json.name;
              user.save(function(err) {
                if (err){
                  return done(err);
                }
                return done(null, user);
              });
            }  
            return done(null, user); // user found, return that user
          } 
          else {
            console.log('user dosen\'t exsist');
            // if there is no user, create them
            console.log(profile._json);
            let newFbUser               = new User();
            newFbUser.facebook.id       = profile._json.id;
            newFbUser.facebook.token    = token;
            newFbUser.facebook.gender   = profile._json.gender;
            newFbUser.facebook.email    = profile._json.email;
            newFbUser.facebook.photo    = profile._json.picture.data.url;
            newFbUser.facebook.authType = "facebook";
            newFbUser.facebook.name     = profile._json.name;
            console.log(newFbUser);
            newFbUser.save((err, user)=>{
              if(err){
                console.log(err);
                return done(err);

              }else if(user){
                return done(null, newFbUser);
              }
            });
          }
        });
      } 
      else {
        console.log('user dosen\'t exist create');
        // user already exists and is logged in, we have to link accounts
        var user               = req.user; // pull the user out of the session
        user.facebook.id       = profile._json.id;
        user.facebook.token    = token;
        user.facebook.gender   = profile._json.gender;
        user.facebook.email    = profile._json.email;
        user.facebook.photo    = profile._json.picture.data.url;
        user.facebook.authType = "facebook";
        user.facebook.name     = profile._json.name;
        user.save(function(err) {
          if (err){
            return done(err);
          }
          return done(null, user);
        });
      }
    });
  }));

  // GOOGLE STRATEGY
  passport.use(new GoogleStrategy({
  clientID: configAuth.GOOGLE.clientID,
  clientSecret: configAuth.GOOGLE.clientSecret,
  callbackURL: configAuth.GOOGLE.callbackURL,
  profileFields: ['id', 'displayName', 'photos', 'email', 'gender'],

  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  passReqToCallback: true
  },
  function(req, token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function() {
      console.log(profile._json)
      // check if the user is already logged in
      if (!req.user) {
        User.findOne({
        'google.id': profile.id
        }, 
        function(err, user) {
          if (err){
            return done(err);
          }
          if (user) {
            // if there is a user id already but no token (user was linked at one point and then removed)
            if (!user.google.token) {
              user.google.token    = token;
              user.google.name     = profile._json.givenName+''+profile._json.familyName;
              user.google.gender   = profile._json.gender;
              user.google.photo    = profile._json.image.url;
              user.google.email    = profile._json.emails[0].value;
              user.google.authType = "google";
              user.save(function(error) {
                if (error) {
                  return done(err);
                }
                return done(null, user);
              });
            }
            return done(null, user);
          } 
          else {
            var newUser             = new User();
            newUser.google.id       = profile._json.id;
            newUser.google.token    = token;
            newUser.google.gender   = profile._json.gender;
            newUser.google.photo    = profile._json.image.url;
            newUser.google.name     = profile._json.givenName+''+profile._json.familyName;
            newUser.google.email    = profile._json.emails[0].value;
            newUser.google.authType = "google";
            newUser.save(function(error) {
              if (error) {
                return done(err);
              }
              return done(null, newUser);
            });
          }
        });
      } 
      else {
        // user already exists and is logged in, we have to link accounts
        // pull the user out of the session
        let user             = req.user;
        user.google.id       = profile._json.id;
        user.google.token    = token;
        user.google.name     = profile._json.givenName+''+profile._json.familyName;
        user.google.gender   = profile._json.gender;
        user.google.photos   = profile._json.image.url;
        user.google.email    = profile._json.emails[0].value;
        user.google.authType = "google";
        user.save(function(err) {
          if (err) {
            return done(err);
          }
          return done(null, user);
        });
      }
    });
  }));
};
