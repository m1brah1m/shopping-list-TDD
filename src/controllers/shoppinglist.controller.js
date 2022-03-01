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

const getItems = async (req, res, next) => {
  try {
    const items = await Item.findAll({ where: { userId: req.user.id } });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};
const updateItem = async (req, res, next) => {
  try {
    // item id === req.params.id
    // user id === req.user.id
    // update to === req.body.itemName , req.body.itemStatus
    if (!req.params.id) {
      return res.status(400).json({ message: "Id not provided" });
    }
    const itemFound = await Item.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!itemFound) {
      return res.status(404).json({ message: "Not found" });
    }
    if (!req.body.itemName && !req.body.itemStatus) {
      return res.status(400).json({ message: "Not updated" });
    }

    const item = await Item.update(req.body, {
      where: { id: req.params.id, userId: req.user.id },
    });
    res.status(200).json({ message: "Updated" });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};
const deleteItem = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Id not provided" });
    }
    const itemFound = await Item.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!itemFound) {
      return res.status(404).json({ message: "Not found" });
    }
    await Item.destroy({ where: { id: req.params.id, userId: req.user.id } });
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};
const deleteItems = async (req, res, next) => {
  try {
    const itemsFound = await Item.findAll({ where: { userId: req.user.id } });
    if (!itemsFound[0]) {
      return res.status(404).json({ message: "Not found" });
    }
    await Item.destroy({
      where: { userId: req.user.id },
    });
    return res.status(201).json({ message: "Deleted" });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};
module.exports = { AddItem, getItems, updateItem, deleteItem, deleteItems };
