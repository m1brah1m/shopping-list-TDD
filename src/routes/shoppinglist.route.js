const {
  AddItem,
  getItems,
  updateItem,
  deleteItem,
  deleteItems,
} = require("../controllers/shoppinglist.controller");
const router = require("express").Router();

router.route("/").post(AddItem).get(getItems).delete(deleteItems);
router.route("/:id").put(updateItem).delete(deleteItem);

module.exports = router;
