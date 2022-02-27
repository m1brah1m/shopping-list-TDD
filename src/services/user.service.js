const bcrypt = require("bcrypt");

const validatePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(10, "a");
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
module.exports = { validatePassword, hashPassword };
