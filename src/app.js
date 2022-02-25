const express = require("express");
const signUpRoute = require("./routes/signup.route");
const logInRoute = require("./routes/login.route");
const app = express();

app.use(express.json());

app.use("/signup", signUpRoute);
app.use("/login", logInRoute);
module.exports = app;
