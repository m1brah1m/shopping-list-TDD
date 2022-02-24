const { signUp } = require("../controllers/signup.controller.js");
const router = require("express").Router();

router.route("/").post(signUp);

module.exports = router;
