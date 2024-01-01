import express from 'express';
import Book from '../models/books.js';
import User from '../models/user.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Test API Router
router.get('/test', (req, res) => {
    return res.status(200).send({
        message: "Welcome to the test endpoint!"
    })
});

// creating the entry of book in db
router.post('/create', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.year){
            return res.status(400).send({
                message: "Send all the required fields"
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
            image: req.body.image,
            price: req.body.price,
            genre: req.body.genre,
            language: req.body.language,
            addedBy: req.body.user 
        }
        
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// get all books from db
router.get("/books",async (req,res)=>{
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// get book by id from db
router.get("/books/:id",async (req,res)=>{
    try {
        const { id } = req.params;
        const bookById = await Book.findById(id);
        return res.status(200).json(bookById);
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// update book details
router.patch("/update/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if(!req.body.title){
            book.title = req.body.title;
        }
        if(!req.body.author){
            book.author = req.body.author;
        }
        if(!req.body.year){
            book.year = req.body.year;
        }

        const updatedBook = await book.save();
        return res.status(200).json({updatedBook});
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// delete book by id
router.delete("/delete/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).send({message: "Book not Found!"});
        }
        return res.status(200).send({message: "Book deleted successfully!"})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// Sign in user and return JWT Token
router.post("/sign-in", async (req, res)=>{
    try {
        if(!req.body.email || !req.body.password){
            return res.status(400).send({
                message: "Send all the required fields"
            });
        }

        const jwt_secretKey = process.env.JWT_SECRET_KEY;
        const user = await User.findOne({email: req.body.email});

        if(!user || user.password != CryptoJS.MD5(req.body.password).toString()){
            return res.status(400).send({
                message: "Invalid Username/Password"
            });
        }

        let data = {
            time: Date(),
            userId: user._id
        }

        const token = jwt.sign(data, jwt_secretKey, {expiresIn: "5min"});
token
        return res.status(200).send({
            message: "Sign In Success!",
            token: token,
            user: {
                name: user.name,
            }
        });
    } catch (error) {
        return res.status(400).send({
            message: "Sign In Error :" + error,
        });
    }
});

// Create a new user in DB
router.post("/sign-up", async (req, res)=>{
    try {
        if(req.body.password != req.body.confirmPassword){
            return res.status(400).send({
                message: "Passwords do not Match!"
            });
        }

        const user = await User.findOne({email: req.body.email});
        if(!user){
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: CryptoJS.MD5(req.body.password).toString()
            });

            if(newUser){
                return res.status(200).send({
                    message: "User Created! You can now Sign In"
                });
            } else {
                return res.status(400).send({
                    message: "Failed to create User!"
                });
            }
        } else {
            return res.status(400).send({
                message: "User Already Exists!"
            });
        }
    } catch (error) {
        return res.status(400).send({
            message: "Sign Up Error :" + error,
        });
    }
})

// Validate an Existing token on client
router.get("/validateToken", (req, res)=>{
    const jwt_secretKey = process.env.JWT_SECRET_KEY;
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY; 
    
    try {
        const token = req.header(tokenHeaderKey); 
        const verified = jwt.verify(token, jwt_secretKey);
        
        if(verified){ 
            return res.status(200).send({
                message: "Token Verified"
            }); 
        } 
    } catch (error) {
        return res.status(401).send(error)
    }
});

export default router;