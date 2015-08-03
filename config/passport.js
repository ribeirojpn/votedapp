var passport = require('passport');
// var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');

module.exports = function () {

  var User = mongoose.model('User');
  // Faltando dados do Twitter
  passport.use(new FacebookStrategy({
    clientID: '497526977087283',
    clientSecret: 'c059fa812eb49748c0f5683da6df17be',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }, function (accessToken, refreshToken, profile, done) {
    User.findOrCreate(
      {'login': profile.id},
      {'name': profile.displayName},
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
