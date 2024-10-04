import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
const port=process.env.PORT || 8000;

connectDB();//connect to the database
const app=express();

app.get('/',(req,res)=>{
    res.send('API is running');
})

//following code is replaced by the code in productRoutes.js
// app.get('/api/products',(req,res)=>{
//     res.json(products);
// })
// // :id is a placeholder for the product id
// app.get('/api/products/:id',(req,res)=>{
//     const product=products.find((p)=>p._id===req.params.id);
//     res.json(product);
// })

app.use('/api/products',productRoutes);

app.listen(port,()=>console.log(`server running on port ${port}`))


