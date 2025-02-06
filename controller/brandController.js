import express from "express";
import { brandModel } from "../models/brandModel.js";

export const brandController = express.Router();

//Route to list (READ)
brandController.get("/brands", async (req, res) => {
  try {
    const data = await brandModel.findAll({
      attributes: ["id", "name", "logo_url"],
    });

    if (!data || data.length === 0) {
      return res.json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Could not get brand list: ${error}`);
  }
});

//Route to details (READ)
brandController.get("/brands/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await brandModel.findOne({
      where: { id: id },
      attributes: ["name","logo_url"],
    });

    if (!data) {
      return res.json({ message: `Could not find brand on id #${id}` });
    }
    console.log(data);
  } catch (error) {
    console.error(`Could not get brand details: ${error}`);
  }
});
//Route to create (CREATE)
brandController.post("/brands", async (req, res) => {
  const { name, logo_url } = req.body;

  if (!name || !logo_url) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await brandModel.create({
        name, 
        logo_url
    });

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not create brand: ${error.message}` });
  }
});

//Route to update (UPDATE)
brandController.put("/brands", async (req, res) => {
  const { name, logo_url, id } = req.body;

  if (!id || !name || !logo_url) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await brandModel.update(
      { id, name, logo_url },
      { where: { id } }
    );

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not find brand: ${error.message}` });
  }
});

//Route to delete (DELETE)
brandController.delete("/brands/:id([0-9]*)", async (req, res) => {
  const { id } = req.params;

  const brand = await brandModel.findOne({
    where: { id },
  });

  if (id) {
    try {
      await brand.destroy();

      res.status(200).send({
        message: `Brand from id: ${id}, has been deleted`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Couldn't delete brand from id: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Id is invalid",
    });
  }
});
