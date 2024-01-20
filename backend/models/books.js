import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        author: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            default: "No Description Available"
        },
        price: {
            type: Number,
            required: true
        },
        genre: {
            type: Array,
            of: String,
            default: "Other"
        },
        language: {
            type: Array,
            of: String,
            default: "Other"
        },
        bestseller: {
            type: Boolean,
            default: false
        },
        addedBy:{
            type:  mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },{
        timestamps: true
    }
)

export default mongoose.model("Book",bookSchema);