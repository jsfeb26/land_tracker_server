const passport = require('passport');

module.exports = app => {
  // route handler for /auth/google
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // route handler for /auth/google/callback
  // uses passport authenticate midddleware and redirects to /dashboard
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  // route handler for /api/
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // route handler for /api/current_user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
