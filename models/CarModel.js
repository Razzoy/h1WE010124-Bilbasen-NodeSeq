import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from "sequelize";

export class CarModel extends Model {}

CarModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    year: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0.00,
    },

    distance: {
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

