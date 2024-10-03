import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData=async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();//
        await User.deleteMany();
        
        const createdUsers=await User.insertMany(users);//insertMany is a mongoose method that allows us to insert multiple documents into a collection

        const adminUser=createdUsers[0]._id;//admin user is the first user in the users array who add products to the database
    
        const sampleProducts=products.map((product)=>{
            return {...product,user:adminUser};//we are adding the admin user to each product
        });

        await Product.insertMany(sampleProducts);//inserting the sample products into the database

        console.log('Data Imported!'.green.inverse);
        process.exit();
    }
    catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData=async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}  


if(process.argv[2]==='-d'){
    destroyData();
}
else{
    importData();
}