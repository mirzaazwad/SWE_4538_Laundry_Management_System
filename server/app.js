const express = require("express");
const path = require ('path');
const app = express ();
app.use (express.json ());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const session = require('express-session');
const passport = require("./config/passport");
const flash = require('express-flash')

app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false}
  })
);

const cors = require("cors");
app.use(cors({
  origin: '*',
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
const authentication_routes = require("./routes/authentication.routes");
const customer_profile_routes = require("./routes/customer.profile.routes");
const manager_profile_routes = require("./routes/manager.profile.routes");
const review_routes = require("./routes/review.routes");
const laundry_routes = require("./routes/laundry.routes");
const order_routes = require("./routes/order.routes");
app.use(authentication_routes);
app.use(order_routes);
app.use(laundry_routes);
app.use(review_routes);
app.use(customer_profile_routes);
app.use(manager_profile_routes);
module.exports = app;
