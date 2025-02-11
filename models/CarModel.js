import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from "sequelize";

export class carModel extends Model {}

carModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    year: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0.00,
    },

    mileage: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }


  },
  {
    sequelize,
    modelName: "car",
    underscored: true, // True: car_brands || False: carBrands
    freezeTableName: false, // True: car || False: cars
    createdAt: true,
    updatedAt: true, 
  }
);

