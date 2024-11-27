const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDb = require('./config/config')
const ItemModel = require('./models/itemModel')
const items = require('./utils/data')
require('colors')

//config
dotenv.config()
connectDb()

//function seeder 
const importData = async () => {
    try{
        await ItemModel.deleteMany()
        const itemData = await ItemModel.insertMany(items)
        console.log('All Items Added'.bgGreen)
        process.exit();
    } catch (error) {
        console.log(`${error}`.bgRed.inverse)
        process.exit(1)
    }
};

importData();
