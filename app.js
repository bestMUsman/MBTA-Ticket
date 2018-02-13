const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const commuterRail = require('./db/commuterrail.json');
require("dotenv").config();
const app = express();
const mbtaRoutes = require("./routes/mbta");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`working with this port: ${PORT}`);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

function turnCommuterRailLinesntoObject() {
  for (let i = 0; i < commuterRail.length; i++) {
    commuterRail[i].linesObj = {};
    commuterRail[i].line.forEach(e => commuterRail[i].linesObj[e] = true);
  }
}
turnCommuterRailLinesntoObject();

function attachCommuterRailToLocals(req, res, next) {
  req.session.commuterRail = commuterRail;
  next();
}

app.use("/", attachCommuterRailToLocals, mbtaRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get("*", function (req, res) {
  res.status(404).render("mbta/not-found", {
    message: "Not Found Error",
  });
});
