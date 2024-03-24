// Set up Global configuration access
import dotenv from 'dotenv'; 
dotenv.config({path: "./config.env"});

import express from 'express';
import cors from 'cors';
import db from './config/mongoose.js';
import bookRouter from './routes/books.js';
import userRouter from './routes/user.js';

const app = express();
// const port = 8080;

app.use(express.json());

// method 1
app.use(cors());

//method 2
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// )


app.use('/booksApi', bookRouter);
app.use('/userApi', userRouter);

app.listen(process.env.APP_PORT, function(err){
    if(err){
        console.log('Something bad happened', err);
    }

    console.log("Server is up and running on port", process.env.APP_PORT)
    // console.log(process.env)
})