const {
  AddItem,
  getItems,
  updateItem,
} = require("../controllers/shoppinglist.controller");
const router = require("express").Router();

router.route("/").post(AddItem).get(getItems);
router.route("/:id").put(updateItem);

module.exports = router;
