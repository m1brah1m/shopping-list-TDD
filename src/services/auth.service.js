const jwt = require("jsonwebtoken");
const config = require("../config/env.config");

const createAccessToken = (user) => {
  const token = jwt.sign({ id: user.dataValues.id }, config.JWT_KEY, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
  return token;
};

const verifyAccessToken = (token) => {
  const match = jwt.verify(token, config.JWT_KEY);
  return match;
};
module.exports = { createAccessToken, verifyAccessToken };
