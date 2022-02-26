const express = require("express");
const signUpRoute = require("./routes/signup.route");
const logInRoute = require("./routes/login.route");
const accountRoute = require("./routes/account.route");
const protect = require("./middlewares/protect.middleware");
const app = express();

app.use(express.json());

app.use("/signup", signUpRoute);
app.use("/login", logInRoute);
app.use("/account", protect, accountRoute);
module.exports = app;
