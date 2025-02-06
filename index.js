import express from 'express'
import dotenv from 'dotenv'
import { dbController } from './controller/dbController.js';
import { carController } from './controller/CarController.js';

dotenv.config()
console.log(process.env);


const app = express()
const port = process.env.SERVERPORT || 5000
app.use(express.urlencoded({extended: true}))

//Route til root
app.get('/', (req,res) => {
    console.log('Hej Verden');
    
    res.send('Hello World')
})

app.use(dbController, carController)

//Route til 404
app.get('*', (req,res) => {
    console.log('Hej Verden');
    
    res.send('Could not find file')
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