import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/sequelizeClient.js'

dotenv.config()
console.log(process.env);


const app = express()
const port = process.env.SERVERPORT || 5000

app.get('/', (req,res) => {
    console.log('Hej Verden');
    
    res.send('Hello World')
})

app.get('/sync', async (req, res) => {
    try {
        const resp = await sequelize.sync();
        res.send('Data successfully syncronized');
    }
    catch(error) {
        res.send(error);
    }
})

app.listen(port, () => {
    console.log(`Server runs at http://localhost:${port}`);
    
})