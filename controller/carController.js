import express from "express";
import { carModel } from "../models/carModel.js";
import { brandModel } from "../models/brandModel.js";

export const carController = express.Router();

carModel.belongsTo(brandModel, {
  foreignKey: {
    allowNull: false
  }
})

brandModel.hasMany(carModel);


//Route to list (READ)
carController.get("/cars", async (req, res) => {
  try {
    const data = await carModel.findAll({
      attributes: ["id", "model", "price", "category", "mileage"],
      include: {
        model: brandModel,
        attributes: ["name"],
      }
    });

    if (!data || data.length === 0) {
      return res.json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Could not get car list: ${error}`);
  }
});

//Route to details (READ)
carController.get("/cars/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await carModel.findOne({
      where: { id: id },
      attributes: [ "category"],
      include: {
        model: brandModel,
        attributes: [ "name"],
      }
    });

    if (!data) {
      return res.json({ message: `Could not find car on id #${id}` });
    }
    console.log(data);
  } catch (error) {
    console.error(`Could not get car details: ${error}`);
  }
});
//Route to create (CREATE)
carController.post("/cars", async (req, res) => {
  const {  model, year, category, price, mileage, brand_id: brandid } = req.body;

  if ( !model || !year || !price || !category || !mileage || !brandid) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await carModel.create({
      model,
      year,
      price,
      category,
      mileage,
      brandid,
    });

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not create car: ${error.message}` });
  }
});

//Route to update (UPDATE)
carController.put("/cars", async (req, res) => {
  const { model, year, price, category, mileage, id } = req.body;

  if (!id || !model || !year || !price || !category || !mileage) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await carModel.update(
      { id, model, year, price, category, mileage },
      { where: { id } }
    );

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not find car: ${error.message}` });
  }
});

//Route to delete (DELETE)
carController.delete("/cars/:id([0-9]*)", async (req, res) => {
  const { id } = req.params;

  const car = await carModel.findOne({
    where: { id },
  });

  if (id) {
    try {
      await car.destroy();

      res.status(200).send({
        message: `Car from id: ${id}, has been deleted`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Couldn't delete car from id: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Id is invalid",
    });
  }
});
