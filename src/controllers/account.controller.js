const User = require("../models/user.model");
const { hashPassword } = require("../services/user.service");

const getAccount = (req, res, next) => {
  try {
    return res.status(200).json({
      message: "Authorized",
      profile: {
        username: req.user.username,
        email: req.user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};
const updateAccount = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }
    const user = await User.update(req.body, { where: { id: req.user.id } });
    return res.status(200).json({ message: "Updated" });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};
module.exports = { getAccount, updateAccount };
