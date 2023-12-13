import express from 'express';
import Book from '../models/books.js';

const router = express.Router();

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
            year: req.body.year
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// get all books from db
router.get("/",async (req,res)=>{
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
router.get("/:id",async (req,res)=>{
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