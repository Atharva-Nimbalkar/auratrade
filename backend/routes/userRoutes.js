/**
 * @description This file contains the routes for user-related operations.
 * It includes routes for user authentication, registration, profile management, and user administration.
 * @module routes/userRoutes
 */

import express, { Router } from 'express';
const router = express.Router();

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
} from '../contollers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

/** * @param {function} registerUser - Controller function to register a new user. * @param {function} getUsers - Controller function to get all users.*/
router.route('/').post(registerUser).get(protect,admin,getUsers);

/** * @param {function} logoutUser - Controller function to log out a user.*/
router.post('/logout', logoutUser);

/** * Route serving user login. * @param {function} authUser - Controller function to authenticate a user.*/
router.post('/login', authUser);

/*** Route serving user profile operations.* @param {function} getUserProfile - Controller function to get the profile of the authenticated user * @param {function} updateUserProfile - Controller function to update the profile of the authenticated user.
 * @param {function} protect - Middleware to protect the route and ensure the user is authenticated.*/
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);


/*** @param {function} deleteUser - Controller function to delete a user by ID.* @param {function} getUserByID - Controller function to get a user by ID.
 * @param {function} updateUser - Controller function to update a user by ID.*/
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserByID).put(protect,admin,updateUser);

export default router;