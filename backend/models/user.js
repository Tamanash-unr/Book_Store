import mongoose from "mongoose";

// Schema for User
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    resetLink:{
        type: String,
        default:''
    },
},{
    timestamps: true
});

export default mongoose.model('User', userSchema);