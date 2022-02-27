const {
  getAccount,
  updateAccount,
} = require("../controllers/account.controller");
const router = require("express").Router();

router.route("/").get(getAccount).put(updateAccount);

module.exports = router;
