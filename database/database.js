const Sequelize = require("sequelize");

const connection = new Sequelize("guiaperguntas", "root", "Diego!1996", {
    host:"localhost",
    dialect: "mysql"
});

module.exports = connection;
