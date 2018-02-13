const express = require('express');
const controller = require('../controllers/usersController');

const router = express.Router();

const authHelpers = require('../services/auth/authHelpers');
const passport = require('../services/auth/local');

router.get('/login', (req, res) => {
  res.render('auth/log-in', {
    messsage: 'Login Page',
    userInfo: req.user,
  });
});
router.get('/register', (req, res) => {
  res.render('auth/register', {
    messsage: 'Registeration Page',
    userInfo: req.user,
  });
});
router.post('/register', controller.create);
router.post(
  '/login',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/mbta/purchase-history',
    failureRedirect: '/auth/login',
    failureFlash: false,
  })
);
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
