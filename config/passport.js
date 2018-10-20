const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy= require("passport-google-oauth20");
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const keys=require('./keys');
module.exports = function(passport){
  //google strategy
//   passport.use(
//     new GoogleStrategy({
  
// clientID: keys.google.clientID,
// clientSecret: keys.google.clientSecret,
// callbackURL:'	/users/auth/google/redirect'
//     },(accessToken,refreshToken,profile,done)=>{
// console.log("ya... I got it's");
// console.log(profile);
//     }
//   ))
  // Local Strategy
  passport.use(new LocalStrategy({ passReqToCallback : true},function(login, password, done){
    // Match Username
    let query = {
      
      login:login};
    User.findOne(query, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }

      // Match Password
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
       
          return done(null, user,{token:token});

        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
