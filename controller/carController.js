import express from 'express'
import { CarModel } from '../models/CarModel.js'

export const carController = express.Router()

//Route to list (READ)
carController.get('/cars', async (req, res) => {
    try {
        const data = await CarModel.findAll({
            attributes: ['brand', 'color']
        })

    if(!data || data.length === 0) {
        return res.json({message: 'No data found'})
    }

        res.json(data)
    } catch (error) {
        console.error(`Could not get car list: ${error}`);
        
    }
})

//Route to details (READ)
carController.get('/cars/:id([0-9]*)', async (req, res) => {
    try {
        const { id } = req.params
        const data = await CarModel.findOne({ where: {id: id}, attributes: ['brand', 'color']})

        if(!data){
            return res.json({message: `Could not find car on id #${id}`})
        }
        console.log(data);
        
    } catch (error) {
        console.error(`Could not get car details: ${error}`);
        
    }
    
})
//Route to creae (CREATE)
carController.post('/cars', async (req, res) => {
    const {brand, model, year, color, price, distance} = req.body;

    if(!brand || !model || !year || !price || !color || !distance) {
        return res.json ({message: 'Missing required data'})
    }

    try {
        const result = await CarModel.create({
            brand, model, year, price, color, distance
        })

        res.status(201).json(result)
    } catch (error) {
        return res.json({message: `Could not create car: ${error.message}`})
    }
    
})