const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("shopping_list_db", "postgres", "postgres", {
  host: "sl-db",
  dialect: "postgres",
});

module.exports = sequelize;
