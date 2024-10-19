import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    },
},{timestamps:true});


/* The `userSchema.methods.matchPassword` function is a custom method defined on the userSchema in
Mongoose. This method is used to compare a plain text password entered by a user with the hashed
password stored in the database for a specific user. */
userSchema.methods.matchPassword=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}
const User=mongoose.model('User',userSchema);

export default User;