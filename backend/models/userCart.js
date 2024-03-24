import mongoose from "mongoose";

// Schema for User Cart
const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cartItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    cartItemsData:{
        type: Object,
    }
},{
    timestamps: true
});

export default mongoose.model('UserCart', cartSchema);