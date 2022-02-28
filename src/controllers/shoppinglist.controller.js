const Item = require("../models/item.model");
const AddItem = async (req, res, next) => {
  try {
    //When I create an item, it should have the user's id
    // itemName is the only thing i want from the body
    // status will default it to pending (In progress)
    // userId will be the one hooked to the req (req.user.id)
    const itemFound = await Item.findOne({
      where: { itemName: req.body.itemName, userId: req.user.id },
    });
    if (itemFound) {
      return res.status(400).json({ message: "Duplicate" });
    }
    const item = await Item.create({
      itemName: req.body.itemName,
      itemStatus: "Pending",
      userId: req.user.id,
    });
    return res.status(201).json({ message: "Created" });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};

module.exports = { AddItem };
