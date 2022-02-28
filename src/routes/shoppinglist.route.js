const { AddItem } = require("../controllers/shoppinglist.controller");
const router = require("express").Router();

router.route("/").post(AddItem);

module.exports = router;
