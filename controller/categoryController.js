import express from "express";
import { categoryModel } from "../models/categoryModel.js";

export const categoryController = express.Router();

//Route to list (READ)
categoryController.get("/categories", async (req, res) => {
  try {
    const data = await categoryModel.findAll({
      attributes: ["id", "name"],
    });

    if (!data || data.length === 0) {
      return res.json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Could not get category list: ${error}`);
  }
});

//Route to details (READ)
categoryController.get("/categories/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await categoryModel.findOne({
      where: { id: id },
      attributes: ["name"],
    });

    if (!data) {
      return res.json({ message: `Could not find category on id #${id}` });
    }
    console.log(data);
  } catch (error) {
    console.error(`Could not get category details: ${error}`);
  }
});
//Route to create (CREATE)
categoryController.post("/categories", async (req, res) => {
  const { name } = req.body;

  if (!name || !brand) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await categoryModel.create({
        name
    });

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not create category: ${error.message}` });
  }
});

//Route to update (UPDATE)
categoryController.put("/categories", async (req, res) => {
  const { name, id } = req.body;

  if (!id || !name) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await categoryModel.update(
      { id, name },
      { where: { id } }
    );

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not find category: ${error.message}` });
  }
});

//Route to delete (DELETE)
categoryController.delete("/categories/:id([0-9]*)", async (req, res) => {
  const { id } = req.params;

  const category = await categoryModel.findOne({
    where: { id },
  });

  if (id) {
    try {
      await category.destroy();

      res.status(200).send({
        message: `Category from id: ${id}, has been deleted`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Couldn't delete category from id: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Id is invalid",
    });
  }
});
