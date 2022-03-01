const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/db");

const Item = sequelize.define("items", {
  id: {
    field: "id",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  itemName: {
    field: "item_name",
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  itemStatus: {
    field: "item_status",
    type: DataTypes.STRING(12),
    allowNull: false,
  },
  userId: {
    field: "user_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Item.sync();
module.exports = Item;
