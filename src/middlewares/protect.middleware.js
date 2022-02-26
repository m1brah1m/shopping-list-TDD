// Refactor into functions
const User = require("../models/user.model");
const { verifyAccessToken } = require("../services/auth.service");
const protect = async (req, res, next) => {
  //If there is a token
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  //If it is in the right format
  if (!bearer.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    const token = bearer.split("Bearer ")[1];
    try {
      const payload = verifyAccessToken(token);
      const user = await User.findByPk(payload.id);
      if (!user) {
        return res.status(404).json({ message: "Unable to login" });
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};
module.exports = protect;
