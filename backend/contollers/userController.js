import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@desc description Auth user & get token login user
// @route POST/api/users/auth
//@access Public
const authUser=asyncHandler(async(req,res)=>{
    // console.log(req.body);/* logging the request body data to the console.  */
    
    const {email,password}=req.body;/*Destructuring the email and password from the request body. */
    const user= await User.findOne({email});/*Is querying the database to find a user with the specified email address. */


    if(user &&  (await user.matchPassword(password))){
        generateToken(res,user._id);
        
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            // token: token //we can pass to the frontend and store in local storage
        });
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
    // res.send('auth user');
});



//@desc Register user
//@router POST/api/users
//@access Public
const registerUser=asyncHandler(async(req,res)=>{
    // res.send('register user');

    const {name,email,password}=req.body;

    const userExists=await User.findOne({email});

    if(userExists){//if user already exists
        res.status(400);
        throw new Error('User already exists');
    }

    const user=await User.create({
        name,email,password
    });

    if(user){
        generateToken(res,user._id);

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc logout user/clear cookie
//@router POST/api/users/logout
//@access Private
const logoutUser=asyncHandler(async(req,res)=>{
    // res.send('logout user');
    // sets a cookie named 'jwt' with an empty value and specific options to make it HTTP-only and expired.
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message: 'Logged out successfully'});
    
});

//@desc Get user profile
//@router GET/api/users/profile
//@access Public
const getUserProfile=asyncHandler(async(req,res)=>{
    // res.send('get user profile');
   const user=await User.findById(req.user._id);
   if(user){
    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    });
   }else{
    res.status(404);
    throw new Error('User not found');
   }
});

//@desc Get user profile
//@router PUT/api/users/profile //user update profile of their own  only so no need to pass id
//@access Private
const updateUserProfile=asyncHandler(async(req,res)=>{
    // console.log(req.body);//getting undefined so use parser
    // res.send('update user profile');
    const user= await User.findById(req.user._id);

    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        
        if(req.body.password){
            user.password=req.body.password;
        }

        const updateUser=await user.save();

        res.status(200).json({
            _id:updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        })
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }


});

//@desc Get users
//@router GET/api/users/profile
//@access Private/admin
const getUsers=asyncHandler(async(req,res)=>{
    res.send('get users');
});

//@desc Get user by ID
//@router GET/api/users/:id
//@access Private/Admin
const getUserByID=asyncHandler(async(req,res)=>{
    res.send('get users by id');
});

//@desc Delete user
//@router DELETE/api/users/:id
//@access Private/admin
const deleteUser=asyncHandler(async(req,res)=>{
    res.send('delete user');
});

//@desc Update user
//@router PUT/api/users/:id
//@access Private/admin
const updateUser=asyncHandler(async(req,res)=>{
    res.send('update user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
}






