import express from 'express';
import Book from '../models/books.js';

const router = express.Router(); 

// Function for validating a given token, return true or false based on result 
function validateToken(token){
    const jwt_secretKey = process.env.JWT_SECRET_KEY;
    const verified = jwt.verify(token, jwt_secretKey);

    if(verified){
        return true;
    } else {
        return false;
    }
}

// Test API Router
router.get('/test', (req, res) => {
    return res.status(200).send({
        message: "Welcome to the test endpoint!"
    })
});

// creating the entry of book in db
router.post('/create', async (req, res) => {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY; 

    try {
        if(!req.body.title || !req.body.author || !req.body.year){
            return res.status(400).send({
                message: "Send all the required fields"
            });
        }

        const auth_token = req.header(tokenHeaderKey); 
        const isValid = validateToken(auth_token);

        if(isValid){
            const data = jwt.decode(auth_token);

            const newBook = {
                title: req.body.title,
                author: req.body.author,
                year: req.body.year,
                image: req.body.image,
                price: req.body.price,
                genre: req.body.genre,
                language: req.body.language,
                description: req.body.desc,
                addedBy: data.userId
            }

            const book = await Book.create(newBook);
            
            return res.status(201).send({
                message: "Add Book Success!",
                book
            });
        } else {
            return res.status(401).send({
                message: 'Invalid/Expired Token'
            });
        }        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});        
    }
})

// get all books from db
router.get("/books/:page/:pagination",async (req,res)=>{
    try{
        // Number of books to return after search
        const pagination = req.params.pagination ? parseInt(req.params.pagination) : 10;
        //PageNumber From which Page to Start 
        const pageNumber = req.params.page ? parseInt(req.params.page) : 1;

        const totalBooks = await Book.count();
        const books = await Book.find({}).skip((pageNumber - 1) * pagination).limit(pagination);

        return res.status(200).json({
            count: totalBooks,
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

export default router;