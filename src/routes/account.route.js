const { accountController } = require("../controllers/account.controller");
const router = require("express").Router();

router.route("/").get(accountController);

module.exports = router;
