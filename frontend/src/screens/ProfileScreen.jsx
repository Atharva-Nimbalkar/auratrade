import React from 'react'
import {useState,useEffect} from 'react';
import {Table,Form,Button,Row,Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');    
    const [password,setPassword]=useState('');  
    const [confirmPassword,setConfirmPassword]=useState('');
    
    const dispatch=useDispatch();

    const {userInfo}=useSelector((state)=>state.auth);//get the user information from the state using the useSelector hook from react-redux library 

    const [updateProfile,{isLoading: loadingUpdateProfile}]=useProfileMutation();//use the useProfileMutation hook to update the user profile

    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    },[userInfo,userInfo.name,userInfo.email]);
    
    const submitHandler=async (e)=>{
        e.preventDefault();
       if(password!==confirmPassword){
        toast.error('Passwords do not match');
       }else{
        try{
            const res=await updateProfile({//call the updateProfile mutation function to update the user profile 
                // _id:userInfo._id,
                name,
                email,
                password
            }).unwrap();//unwrap the promise returned by the updateProfile mutation function to get the response data 
            dispatch(setCredentials(res));//update the user information in the state with the new user information 
            toast.success('Profile Updated');
        }
        catch(error){
            toast.error(error?.data?.message || error.error);
        }
       }
    }

    return (
    <Row>
        <Col md={3}>
        <h2>
            User Profile
        </h2>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='my-2'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
                Update
            </Button>
            {/* show the loader component when the user profile is being updated  */}
            {loadingUpdateProfile && <Loader/>}
        </Form>
        </Col>
        <Col md={9}>Column</Col>
    </Row>
  )
}

export default ProfileScreen