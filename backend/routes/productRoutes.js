import express from 'express';
const router =express.Router();
// import products from '../data/products.js';
// import asyncHandler from '../middleware/asyncHandler.js';
// import Product from '../models/productModel.js';
// import mongoose from 'mongoose';
import {getProducts,
    getProductById,
    createProduct,
    updateProduct,
} from '../contollers/productContoller.js';
import {protect,admin} from '../middleware/authMiddleware.js';

/* The `asyncHandler(async(req,res)` function is a middleware function used in this
Express router to handle asynchronous operations. It wraps the route handler
functions with try-catch blocks to catch any errors that occur during the
asynchronous operations and pass them to the Express error handling middleware.*/ 
// router.get('/',asyncHandler(async(req,res)=>{
//     const products=await Product.find({});
//     res.json(products);
// }));
// // :id is a placeholder for the product id
// router.get('/:id',
//     asyncHandler(async(req,res)=>{

//     const { id } = req.params;

//         // Validate if the id is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'Invalid product ID' });
//     }
//     // const product=products.find((p)=>p._id===req.params.id);
//     const product=await Product.findById(req.params.id);//get the product by id from the database
    
//     if(product){
//         return res.json(product);
//     }

//     res.status(404).json({message:'Product not found'});
// }));

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route('/:id').get(getProductById).put(protect,admin,updateProduct);
/*  Express
    automatically parses the value of that parameter and makes
    it available in the `req.params` object. */
export default router;