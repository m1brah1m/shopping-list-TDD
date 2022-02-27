const User = require("../models/user.model");
const { createAccessToken } = require("../services/auth.service");
const { validatePassword } = require("../services/user.service");
exports.logIn = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const match = validatePassword(req.body.password, user.password);

      if (match == false) {
        return res.status(401).json({ message: "Login failure" });
      } else {
        const token = createAccessToken(user);
        return res.status(200).json({ message: "Login success", token: token });
      }
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};
