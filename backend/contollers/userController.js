import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';


//@desc description Auth user & get token login user
// @route POST/api/users/login
//@access Public
const authUser=asyncHandler(async(req,res)=>{
res.send('auth user');
});


//@desc Register user
//@router POST/api/users
//@access Public
const registerUser=asyncHandler(async(req,res)=>{
    res.send('register user');
});

//@desc logout user/clear cookie
//@router POST/api/users/logout
//@access Private
const logoutUser=asyncHandler(async(req,res)=>{
    res.send('logout user');
});

//@desc Get user profile
//@router GET/api/users/profile
//@access Public
const getUserProfile=asyncHandler(async(req,res)=>{
    res.send('get user profile');
});

//@desc Get user profile
//@router PUT/api/users/profile //user update profile of their own  only so no need to pass id
//@access Private
const updateUserProfile=asyncHandler(async(req,res)=>{
    res.send('update user profile');
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






