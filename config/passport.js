require('dotenv').config()
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
var TwitterStrategy = require('passport-twitter').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var mongoose = require('mongoose')

module.exports = function () {

  var User = mongoose.model('User')

  // Facebook Oauth Strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    // callbackURL: 'https://voted.herokuapp.com/auth/facebook/callback',
    profileFields: ['id','displayName','photos','emails']
  }, function (accessToken, refreshToken, profile, done) {
    User.findOrCreate(
      {'login': profile.emails[0].value},
      {'name': profile.displayName,
      'photo': profile.photos[0].value},
      function (erro, user) {
        if(erro){
          console.log(erro)
          return done(erro)
        }
        return done(null,user)
      }
    )
  }))

  // Twitter Oauth Strategy
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    // callbackURL: "http://localhost:3000/auth/twitter/callback",
    callbackURL: 'https://voted.herokuapp.com/auth/twitter/callback',
    profileFields: ['id','displayName','photos','username']
  }, function (token, tokenSecret, profile, done) {
    User.findOrCreate(
      {'login': profile.username},
      {'name': profile.displayName,
      'photo': profile.photos[0].value},
      function (erro, user) {
        if(erro){
          console.log(erro)
          return done(erro)
        }
        return done(null,user)
      }
    )
  }))

  // Google Oauth2 Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "http://localhost:3000/auth/google/callback",
    callbackURL: 'https://voted.herokuapp.com/auth/google/callback',
    profileFields: ['id','displayName','photos','emails']
  },function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(
      {'login': profile.emails[0].value},
      {'name': profile.displayName,
      'photo': profile.photos[0].value},
      function (erro, user) {
        if(erro){
          console.log(erro)
          return done(erro)
        }
        return done(null,user)
      }
    )
  }))

  passport.serializeUser(function (user,done) {
    done(null,user._id)
  })

  passport.deserializeUser(function (id,done) {
    User.findById(id).exec().then(function (user) {
      done(null,user)
    })
  })
}
