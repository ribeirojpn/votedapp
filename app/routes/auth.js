var passport = require('passport');
module.exports = function (app) {
  // FACEBOOK OAUTH
  app.get('/auth/facebook',passport.authenticate('facebook',{scope: 'email'}));
  app.get('/auth/facebook/callback',passport.authenticate('facebook', {
    successRedirect: '/#/dashboard',
    failureRedirect: '/#/auth'
  }));
  // TWITTER OAUTH
  app.get('/auth/twitter',passport.authenticate('twitter',{scope: 'photo'}));
  app.get('/auth/twitter/callback',passport.authenticate('twitter', {
    successRedirect: '/#/dashboard',
    failureRedirect: '/#/auth'
  }));
  // GOOGLE OAUTH2
  app.get('/auth/google',passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login','email']
  }));
  app.get('/auth/google/callback',passport.authenticate('google', {
    successRedirect: '/#/dashboard',
    failureRedirect: '/#/auth'
  }));

  // Logout
  app.get('/logout', function (req,res) {
    req.logOut();
    res.redirect('/');
  });
}
