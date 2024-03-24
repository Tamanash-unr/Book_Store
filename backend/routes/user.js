import express from 'express';
import User from '../models/user.js';
import UserCart from '../models/userCart.js';

import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

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

// Validate an Existing token on client
router.get("/validateToken", (req, res)=>{ 
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY; 

    try {
        const token = req.header(tokenHeaderKey); 
        const isValid = validateToken(token);    

        if(isValid){ 
            const data = jwt.decode(token);

            return res.status(200).send({
                message: "Token Verified",
                user: {
                    name: data.username,
                }
            }); 
        } 
    } catch (error) {
        return res.status(401).send(error)
    }
});

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
            userId: user._id,
            username: user.name
        }

        const token = jwt.sign(data, jwt_secretKey, {expiresIn: "12h"});

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


router.post("/updateCart", async (req, res)=>{
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

    if(!req.body.items || req.body.itemsData){
        return res.status(403).send({message: "No Data Received!"});
    }

    try {
        const auth_token = req.header(tokenHeaderKey); 
        const isValid = validateToken(auth_token);

        if(isValid){
            const data = jwt.decode(auth_token);

            const cart = {
                user: data.userId,
                cartItems: req.body.items,
                cartItemsData: req.body.itemData
            }

            console.log(req.body)
            
            let query = {user: data.userId};
            let options = {upsert: true, new: true};

            const updateCart = await UserCart.findOneAndUpdate(query, cart, options);

            return res.status(201).send({
                message: "Cart Updated!",
                updateCart
            });
        }  else {
            return res.status(401).send({
                message: 'Invalid/Expired Token'
            });
        }    
    } catch (error) {
        return res.status(500).send({message: error.message}); 
    }
});

router.get("/getUserCart", async (req, res) => {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

    try {
        const auth_token = req.header(tokenHeaderKey); 
        const populate = req.header("populate");
        const isValid = validateToken(auth_token);

        if(isValid){
            const data = jwt.decode(auth_token);
            let cart = {};

            if(populate === "true"){
                cart = await UserCart.findOne({user: data.userId}).populate('cartItems');
            } else {
                cart = await UserCart.findOne({user: data.userId});
            }

            return res.status(200).send({
                message: "Success!",
                cart: cart,
                populate
            });
        } else {
            return res.status(401).send({
                message: 'Invalid/Expired Token'
            });
        }
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
})

export default router;