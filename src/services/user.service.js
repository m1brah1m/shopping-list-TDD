const bcrypt = require("bcrypt");

const validatePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = validatePassword;
