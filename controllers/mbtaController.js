const MBTAModel = require("../models/mbta");

const controller = {};

controller.showTicketsByUserId = (req, res) => {
  MBTAModel.findTicketsByUserId(req.user.id)
    .then(mbta => {
      let message = (req.session.boughtTicket) ? "Congratulations You Just Purchased A Ticket!" : false;
      req.session.boughtTicket = false;
      res.render("mbta/purchase-history", {
        message,
        mbta,
        userInfo: req.user,
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

controller.create = (req, res) => {
  MBTAModel.create({
    origin: req.session.origin,
    destination: req.session.destination,
    user_id: req.user.id,
  })
    .then(mbta => {
      req.session.boughtTicket = true;
      res.redirect("/mbta/purchase-history");
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = controller;
