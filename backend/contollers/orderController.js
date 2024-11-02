import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

//@desc Create new order
//@route POST /api/orders
//@access Private
const addOrderItems=asyncHandler(async(req,res)=>{
  const {orderItems,
   shippingAddress,
   paymentMethod,
   itemsPrice,
   taxPrice,
   shippingPrice,
   totalPrice}=req.body;

   if(orderItems && orderItems.length===0){
         res.status(400);
         throw new Error("No order Items");
   }else{
         const order=new Order({
            orderItems: orderItems.map((x)=>({
               ...x,
               product: x._id,
               _id: undefined
            })),
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
         });

         const createdOrder=await order.save();

         res.status(201).json(createdOrder);
   }


});

//@desc Get logged in user orders
//@route GET /api/orders/mine
//@access Private
const getMyOrders=asyncHandler(async(req,res)=>{
    res.send('get my orders')
 });

//@desc Get order by ID
//@route GET /api/orders/:id
//@access Private
const getOrderById=asyncHandler(async(req,res)=>{
    res.send('get order by id');
 });

//@desc update order to paid
//@route GET /api/orders/:id/pay 
//@access Private
const updateOrderToPaid=asyncHandler(async(req,res)=>{
    res.send('update order to paid');
 });

//@desc update order to delivered
//@route GET /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    res.send('update order to delivered');
 });


//@desc get All orders
//@route GET /api/orders
//@access Private/Admin
const getOrders=asyncHandler(async(req,res)=>{
    res.send('get all orders');
 });

export {addOrderItems,getMyOrders,getOrderById,updateOrderToPaid,updateOrderToDelivered,getOrders};
