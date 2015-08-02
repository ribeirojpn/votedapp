var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var mongoose = require('mongoose');

module.exports = function () {

  var User = mongoose.model('User');
  // Faltando dados do Twitter
  passport.use(new TwitterStrategy({
    consumerKey:'',
    consumerSecret: '',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  }, function (token, tokenSecret, profile, done) {
    User.findOrCreate(
      {'login': profile.id},
      {'name': profile.displayName},
      function (erro, user) {
        if(erro){
          console.log(erro);
          return done(erro);
        }
        return done(user);

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
