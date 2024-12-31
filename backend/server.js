import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
import connectDB from './config/db.js';
// import { notFound,errorHandler } from './middleware/errorMiddleware.js'; //error handling done in productContoller.js file
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
const port=process.env.PORT || 8000;

connectDB();//connect to the database
const app=express();


//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cors());

//cookie parser middleware
app.use(cookieParser());
// app.get('/',(req,res)=>{
//     res.send('API is running');
// })

//following code is replaced by the code in productRoutes.js
// app.get('/api/products',(req,res)=>{
//     res.json(products);
// })
// // :id is a placeholder for the product id
// app.get('/api/products/:id',(req,res)=>{
//     const product=products.find((p)=>p._id===req.params.id);
//     res.json(product);
// })

app.get('/api/config/paypal',(req,res)=>{
    res.send({clientId: process.env.PAYPAL_CLIENT_ID});
})


const corsOptions = {
    origin: ['http://localhost:3000','https://gadgets-nvgd.onrender.com/'],
    credentials: true,
};
app.use(cors(corsOptions));


app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);
// app.use(notFound);
// app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname,'/uploads')));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.listen(port,()=>console.log(`server running on port ${port}`))


