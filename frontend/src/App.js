import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Navbar, Home, SignIn, SignUp, Footer, NotFound, Books, About, Cart} from "./Components";
import "./App.css";

function App(){
    const [cartItems, setCartItems] = useState([]);

    useEffect(()=>{
        console.log("component did mount");
    },[]);

    function handleAddToCart(){
        //add item to cart
    }

    return (
        <div className="main-container">
            <Router>
                <Navbar currentCartItems={cartItems.length}/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/users/signIn" element={<SignIn/>}/>
                    <Route exact path="/users/signUp" element={<SignUp/>}/>
                    <Route exact path="/users/myCart" element={<Cart/>}/>
                    <Route exact path="/books" element={<Books/>}/>
                    <Route exact path="/about" element={<About/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;