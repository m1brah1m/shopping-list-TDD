const { getAccount } = require("../controllers/account.controller");
const router = require("express").Router();

router.route("/").get(getAccount);

module.exports = router;
