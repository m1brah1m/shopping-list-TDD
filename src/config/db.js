const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("shopping_list_db", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
