import mongoose from 'mongoose';

const orderSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    /* The `orderItems` field in the `orderSchema` is an array of objects. Each object in the array
    represents an item in the order. */
    orderItems:[{
        name:{type:String,required:true},
        qty:{type:Number,required:true},
        image:{type:String,required:true},
        price:{type:Number,required:true},
        product:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Product'}
    }],
   /* The `shippingAddress` field in the `orderSchema` is defining the structure of the shipping
   address for an order. */
    shippingAddress:{
        address:{type:String,required:true},
        city: {type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,requires:true},
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String},
    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0.0,
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0.0,
    },
    shippingPrice:{
        type:Number,
        required:true,
        default: 0.0,
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0,
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false,
    },
    paidAt:{
        type:Date
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default:false,
    },
    deliveredAt:{
        type:Date
    }
},{timeStamps:true});

const Order=mongoose.model('Order',orderSchema);   

export default Order;
