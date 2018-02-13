const db = require("../db/config");

const MBTA = {};

MBTA.findTicketsByUserId = userId => {
  return db.query(`SELECT * FROM tickets WHERE user_id = $1 ORDER BY id DESC`, [userId]);
};

MBTA.create = mbta => {
  return db.one(
    `
    INSERT INTO tickets
    (origin, destination, user_id)
    VALUES ($1, $2, $3) RETURNING *
    `, [
      mbta.origin,
      mbta.destination,
      mbta.user_id
    ]
  );
};

module.exports = MBTA;
