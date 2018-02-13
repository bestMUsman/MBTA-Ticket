const db = require('../db/config');

const User = {};

User.findByUserEmail = email => {
  return db.oneOrNone(`SELECT * FROM users WHERE email = $1`, [email]);
};

User.create = user => {
  return db.one(
    `
    INSERT INTO users
    (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4) RETURNING *
    `,
    [user.first_name, user.last_name, user.email, user.password]
  );
};

module.exports = User;
