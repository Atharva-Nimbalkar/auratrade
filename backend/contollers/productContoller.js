import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


//@desc Fetch all products
// @route GET/api/products
//@access Public
const getProducts=asyncHandler(async(req,res)=>{
    const pageSize=2;//number of products per page 
    const page=Number(req.query.pageNumber)||1;//current page number
    const count=await Product.countDocuments();//total number of products in the database

    const products=await Product.find({})
    .limit(pageSize)//limit the number of products to be displayed on the page
    .skip(pageSize*(page-1));//get the products from the database
    res.json({products,page,pages:Math.ceil(count/pageSize)});
})


//@desc Fetch a product
//@route GET/api/products/:id
//@access Public
const getProductById=asyncHandler(async(req,res)=>{
        // const { id } = req.params;
    
            // Validate if the id is a valid ObjectId
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //         return res.status(400).json({ message: 'Invalid product ID' });
        // }
        // const product=products.find((p)=>p._id===req.params.id);
        const product=await Product.findById(req.params.id);//get the product by id from the database
        
        if(product){
            return res.json(product);
        }else{//if product is not found in the database 
            res.status(404);
            throw new Error('Product not found');
        }
    })

//@desc Create a product
// @route POST/api/products
//@access Private/Admin
const createProduct=asyncHandler(async(req,res)=>{
    const product=new Product({
        name : 'Sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'Sample brand',
        category:'Sample category',
        countInStock:0,
        numReviews:0,
        description:'Sample description',
    });
    const createdProduct=await product.save();//save the product to the database 
    res.status(201).json(createdProduct);//return the created product 
})

//@desc update all products
// @route PUT/api/products
//@access Private/Admin
const updateProduct=asyncHandler(async(req,res)=>{
    const {name,price,description,image,brand,category,countInStock}=req.body;

    const product =await Product.findById(req.params.id);

    if(product){
        product.name=name||product.name;
        product.price=price||product.price;
        product.description=description||product.description;
        product.image=image||product.image;
        product.brand=brand||product.brand;
        product.category=category||product.category;
        product.countInStock=countInStock||product.countInStock;

        const updatedProduct=await product.save();  
        res.json(updatedProduct);
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});

//@desc delete all products
// @route DELETE/api/products/:id
//@access Private/Admin
const deleteProduct=asyncHandler(async(req,res)=>{
    const {name,price,description,image,brand,category,countInStock}=req.body;

    const product =await Product.findById(req.params.id);

    if(product){
        await Product.deleteOne({
/* It is specifying that the product to be deleted should have an `_id` field that matches the `_id` of the product object passed as `product`. */
            _id:product._id
        });
        res.status(200).json({message:'Product deleted'});
    }else{
        res.status(404);
        throw new Error('Resource not found');
    }
});

//@desc create a new review
// @route DELETE/api/products/:id/reviews
//@access Private
const createdProductReview=asyncHandler(async(req,res)=>{
    const {rating,comment}=req.body;

    const product =await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed=product.reviews.find((r)=>r.user.toString()===req.user._id.toString());
        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed');
        }
        const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id,
        };
        product.reviews.push(review);
        product.numReviews=product.reviews.length;
        product.rating=product.reviews.reduce((acc,review)=>review.rating+acc,0)/product.reviews.length;
        await product.save();
        res.status(201).json({message:'Review added'});
    }else{
        res.status(404);
        throw new Error('Resource not found');
    }
});

export  {getProducts,getProductById,createProduct,
    updateProduct,deleteProduct,createdProductReview};