const { logIn } = require("../controllers/login.controller");
const router = require("express").Router();

router.route("/").post(logIn);

module.exports = router;
