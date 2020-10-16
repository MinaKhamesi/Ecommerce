import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/UserModel.js';
import Product from './models/ProductModel.js';
import Order from './models/OrderModel.js';
import { exit } from 'process';

dotenv.config()
connectDB()

const importData = async ()=>{
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);
        const Admin = createdUsers[0]._id;

        const productsToInsert = products.map(p =>{
            return { ...p ,user:Admin}
        });
        await Product.insertMany(productsToInsert);

        console.log('Data Imported Successfully'.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error:${error.message}`.red.inverse);
        process.exit(1)
    }
}

const destroyData = async ()=>{
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('Data destroyed...'.red.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error:${error.message}`.red.inverse);
        process.exit(1)
    }
}


if(process.argv[2]==='-d'){
    destroyData();
}else{
    importData();
}