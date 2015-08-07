var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');

module.exports = function () {

  var User = mongoose.model('User');

  // Facebook Oauth Strategy
  passport.use(new FacebookStrategy({
    clientID: '497526977087283',
    clientSecret: 'c059fa812eb49748c0f5683da6df17be',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id','displayName','photos','emails']
  }, function (accessToken, refreshToken, profile, done) {
    User.findOrCreate(
      {'login': profile.emails[0].value},
      {'name': profile.displayName,
      'photo': profile.photos[0].value},
      function (erro, user) {
        if(erro){
          console.log(erro);
          return done(erro);
        }
        return done(null,user);
      }
    )
  }));

  // Twitter Oauth Strategy
  passport.use(new TwitterStrategy({
    consumerKey: 'VX4YymEHUKbHjljNJHgf0cXOR',
    consumerSecret: 'TtATUc9sjeYFavgE8HV5cdqQpgOy8mZFo3x21zuHFtpPZdN1Ql',
    callbackURL: "http://localhost:3000/auth/twitter/callback",
    profileFields: ['id','displayName','photos','username']
  }, function (token, tokenSecret, profile, done) {
    User.findOrCreate(
      {'login': profile.username},
      {'name': profile.displayName,
      'photo': profile.photos[0].value},
      function (erro, user) {
        if(erro){
          console.log(erro);
          return done(erro);
        }
        return done(null,user);
      }
    )
  }));

  // Google Oauth2 Strategy
  passport.use(new GoogleStrategy({
    clientID: '783401917437-0oocrqap97h4vg4rdh08apinmf9tiutk.apps.googleusercontent.com',
    clientSecret: 'ap1mcd6fLJVm_CRrDLpSSZpv',
    callbackURL: "http://localhost:3000/auth/google/callback",
    profileFields: ['id','displayName','photos','emails']
  },function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(
      {'login': profile.emails[0].value},
      {'name': profile.displayName,
      'photo': profile.photos[0].value},
      function (erro, user) {
        if(erro){
          console.log(erro);
          return done(erro);
        }
        return done(null,user);
      }
    )
  }));

  passport.serializeUser(function (user,done) {
    done(null,user._id);
  });

  passport.deserializeUser(function (id,done) {
    User.findById(id).exec().then(function (user) {
      done(null,user);
    });
  });
};
