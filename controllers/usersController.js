const bcrypt = require('bcryptjs');
const User = require('../models/user');

const controller = {};

controller.create = (req, res, next) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
 
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password:hash,
  })
    .then(user => {
      req.login(user, err => {
        if (err) return next(err);
        res.redirect(req.session.returnTo || '/mbta/purchase-history');
        delete req.session.returnTo;
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports = controller;