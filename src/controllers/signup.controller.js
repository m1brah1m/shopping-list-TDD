const User = require("../models/user.model");
const createAccessToken = require("../services/auth.service");
exports.signUp = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const userFound = await User.findOne({ where: { email: req.body.email } });
    if (userFound) {
      return res.status(400).json({ message: "Email in use" });
    }
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const token = createAccessToken(user);
    return res.status(201).json({ message: "Account created", token: token });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ message: `${error.errors[0].message}` });
    } else {
      return res.status(400).json({ message: "Error" });
    }
  }
};
