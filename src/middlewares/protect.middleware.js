const User = require("../models/user.model");
const { verifyAccessToken } = require("../services/auth.service");
const checkIfTokenInHeaders = (request, response) => {
  const bearer = request.headers.authorization;
  if (!bearer) {
    return false;
  } else {
    return bearer;
  }
};
const checkTokenFormat = (bearer) => {
  if (!bearer.startsWith("Bearer ")) {
    return false;
  } else {
    return true;
  }
};
const checkUser = async (payload, request) => {
  const user = await User.findByPk(payload.id);
  if (!user) {
    return false;
  } else {
    request.user = user;
    return true;
  }
};

const protect = async (req, res, next) => {
  //If there is a token
  const bearer = checkIfTokenInHeaders(req, res); //bearer if there,false otherwise
  if (bearer === false) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  //If it is in the right format
  const result = checkTokenFormat(bearer); //true if it is in the right format,false otherwise
  if (result === false) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = bearer.split("Bearer ")[1];
  try {
    const payload = verifyAccessToken(token);
    const result = await checkUser(payload, req);
    if (result === false) {
      return res.status(404).json({ message: "Unable to login" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = protect;
