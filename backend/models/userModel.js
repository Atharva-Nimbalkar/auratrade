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

userSchema.pre('save',async function(next){//pre method used in middleware to hash the password before saving in database
    if(!this.isModified('password')){//if password is not modified
        next();//move to the next middleware
    }
    // bcrypt library to generate a salt. A salt is a random string added to the password before hashing to ensure that even identical passwords result in different hashes

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})
const User=mongoose.model('User',userSchema);

export default User;