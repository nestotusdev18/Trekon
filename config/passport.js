const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy= require("passport-google-oauth20");
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
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
  passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},function(Username, password, done){
    // Match Username
   
    // let query= {
      
    //   "firstName" :Username
    // };
   // console.log(query.credential.login);
    User.findOne({"credential.login": Username  }, function(err, user){
      if(err) throw err;
      if(!user){
      //  console.log(user[0]);
        return done(null, false, {message: 'No user found.'});
      }
      //console.log(user[0]);
      // Match Password
      bcrypt.compare(password, user.credential.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          // var token = jwt.sign({ id: user._id }, config.secret, {
          //   expiresIn: 86400 // expires in 24 hours
          // });
       
          return done(null, user,{message: ' user found.'});

        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : config.secret
},

function (jwtPayload, done) {

    //find the user in db if needed
    return User.findById(jwtPayload.id)
        .then(user => {
          
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
}
));
}
