import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        require: true,
        unique:true
    },
    email :{
        type: String,
        require: true,
        unique:true
    },
    password :{
        type: String,
        require: true,
        unique:true
    }
},{timestamps:true})

const User = mongoose.model("users",userSchema)

export default User