const { AddItem, getItems } = require("../controllers/shoppinglist.controller");
const router = require("express").Router();

router.route("/").post(AddItem).get(getItems);

module.exports = router;
