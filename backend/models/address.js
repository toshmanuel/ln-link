"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.Contact, { foreignKey: "contactUuid" });
    }
  }
  Invoice.init(
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      uri: {
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      contactUuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
