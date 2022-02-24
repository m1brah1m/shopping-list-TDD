const express = require("express");
const signUpRoute = require("./routes/signup.route");
const app = express();

app.use(express.json());

app.use("/signup", signUpRoute);
module.exports = app;
