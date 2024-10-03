import mongoose from 'mongoose';

const reviewSchema=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
/*  This establishes a relationship between the `Product` model and the `User` model in
the MongoDB database, allowing for easy retrieval and population of related user information when
querying the product data. */
        ref: "User",
    },
    name:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    comments:{
        type:String,
        required:true,  
    }
},{timestamps:true});

const productSchema=new mongoose.Schema({
    user:{
/* The line `type: mongoose.Schema.Types.ObjectId` in the productSchema is defining a field named
`user` that will store an ObjectId. This field is used to establish a relationship between the
`Product` model and the `User` model in a MongoDB database. By specifying
`mongoose.Schema.Types.ObjectId`, we are indicating that the `user` field will store the unique
identifier (ObjectId) of a user document from the `User` collection. This helps in creating a
reference to the user who added the product in the database schema. */
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: 'User'  
    },
    name: {
        type: String,
        required: true,
    },
    image:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required : true,
    },
/* The line `reviews : [reviewsSchema],` in the productSchema is defining a field named `reviews` that
is an array of objects based on the `reviewsSchema`. This means that each product document can have
multiple reviews associated with it, and each review will follow the structure defined in the
`reviewsSchema`. */
    reviews : [reviewSchema],
    rating:{
        type:Number,
        required:true,
        default:0,
    },
    numReviews:{
        type:Number,
        required:true,
        default:0,
    },
    price:{
        type:Number,
        required:true,
        default :0,
    },
    countInStock:{
        type:Number,
        required:true,
        default:0,
    },
},{
    timestamps:true,
});

/*The `mongoose.model()` function takes two arguments - the name of the model ('Product' in this case) and the schema
definition (`productSchema` in this case). */

const Product=mongoose.model('Product',productSchema);

export default Product;