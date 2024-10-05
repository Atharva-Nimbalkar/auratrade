import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


//@desc Fetch all products
// @route GET/api/products
//@access Public
const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({});
    res.json(products);
})


//@desc Fetch a product
//@route GET/api/products/:id
//@access Public
const getProductById=asyncHandler(async(req,res)=>{
    asyncHandler(async(req,res)=>{

        const { id } = req.params;
    
            // Validate if the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid product ID' });
        }
        // const product=products.find((p)=>p._id===req.params.id);
        const product=await Product.findById(req.params.id);//get the product by id from the database
        
        if(product){
            return res.json(product);
        }
    
        res.status(404).json({message:'Product not found'});
    })
})

export default {getProducts,getProductById};