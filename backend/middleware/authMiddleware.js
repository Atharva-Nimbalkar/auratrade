import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//Protected routes 
const protect=asyncHandler(async(req,res,next)=>{
    let token;

    token=req.cookies.jwt;

    if(token){
        try{
/* The line `const decoded=jwt.verify(token,process.env.JWT_SECRET);` is decoding a JSON Web Token
(JWT) using the `jwt.verify` method provided by the `jsonwebtoken` library in JavaScript. */
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            // this line of code retrieves a user from the MongoDB database using the user's ID, excludes the password field for security reasons, and attaches the user object to the request object. 
            // This allows subsequent middleware and route handlers to access the authenticated user's information, facilitating secure and efficient handling of user-specific operations.
            req.user=await User.findById(decoded.userId).select('-password');
            next();
        }
        catch(error){
            console.log(error);
            res.status(401);
            throw new Error('Not authotized,token failes');
        }
    }else{
        res.status(401);
        throw new Error('Not authorized,no token');
    }
})

//Admin middleware

/**
 checks if the `req.user` object exists and if the user has admin privileges.
 * If the user is an admin, the request is passed to the next middleware or route handler.
 */
const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};


export {protect,admin};
