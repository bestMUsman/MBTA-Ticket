const express = require('express');
const controller = require('../controllers/mbtaController');
const authHelpers = require('../services/auth/authHelpers');
const mbtaHelpers = require('../services/mbta/mbtaHelpers');

const mbtaRoutes = express.Router();

mbtaRoutes.get('/', (req, res) => {
  res.render('mbta/index', {
    message: 'Home Page',
    userInfo: req.user,
  });
});

mbtaRoutes.get('/mbta/select-origin', authHelpers.loginRequired, (req, res) => {
  let commuterRail = req.session.commuterRail;
  res.render('mbta/select-origin', {
    commuterRail,
    userInfo: req.user,
  });
});

mbtaRoutes.post('/mbta/select-origin', authHelpers.loginRequired, mbtaHelpers.handleOriginForm, (req, res) => {
  res.redirect('/mbta/select-destination');
});

mbtaRoutes.get('/mbta/select-destination', authHelpers.loginRequired, mbtaHelpers.handleSelectDestination, (req, res) => {
  res.render('mbta/select-destination', {
    possibleDestinations: req.session.possibleDestinations,
    userInfo: req.user,
  });
});

mbtaRoutes.post('/mbta/select-destination', authHelpers.loginRequired, mbtaHelpers.handleDestinationForm, (req, res) => {
  res.redirect('/mbta/ticket-confirm');
});

mbtaRoutes.get('/mbta/ticket-confirm', authHelpers.loginRequired, mbtaHelpers.handleViewTicketConfirmation, (req, res) => {
  res.render('mbta/ticket-confirm', {
    origin: req.session.origin,
    destination: req.session.destination,
    userInfo: req.user,
  });
});

mbtaRoutes.post('/mbta/ticket-confirm', authHelpers.loginRequired, controller.create);
mbtaRoutes.get('/mbta/purchase-history', authHelpers.loginRequired, controller.showTicketsByUserId);

module.exports = mbtaRoutes;