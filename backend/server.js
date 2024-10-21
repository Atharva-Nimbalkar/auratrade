import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import connectDB from './config/db.js';
// import { notFound,errorHandler } from './middleware/errorMiddleware.js'; //error handling done in productContoller.js file
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const port=process.env.PORT || 8000;

connectDB();//connect to the database
const app=express();


//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

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
app.use('/api/users',userRoutes);


// app.use(notFound);
// app.use(errorHandler);
app.listen(port,()=>console.log(`server running on port ${port}`))


