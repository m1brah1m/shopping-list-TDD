const jwt = require("jsonwebtoken");
const config = require("../config/env.config");

const createAccessToken = (user) => {
  console.log("in fn", user.dataValues.id);
  const token = jwt.sign({ id: user.dataValues.id }, config.JWT_KEY, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = createAccessToken;
