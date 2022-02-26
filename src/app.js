const express = require("express");
const signUpRoute = require("./routes/signup.route");
const logInRoute = require("./routes/login.route");
const profileRoute = require("./routes/profile.route");
const protect = require("./middlewares/protect.middleware");
const app = express();

app.use(express.json());

app.use("/signup", signUpRoute);
app.use("/login", logInRoute);
app.use("/profile", protect, profileRoute);
module.exports = app;
