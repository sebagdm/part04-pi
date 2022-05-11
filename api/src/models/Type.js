const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("types", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    es: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
