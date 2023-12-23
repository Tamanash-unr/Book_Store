import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Navbar, Home, Dashboard, SignIn, SignUp, Footer, NotFound, Books, About, Cart, UserProfile, Orders, AddNew} from "./Components";
import "./App.css";

function App(){
    // React State Hooks
    const [cartItems, setCartItems] = useState([]); /* State hook for Cart */
    let isLoggedIn = false;

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
                    {isLoggedIn ? <Route exact path="/" element={<Dashboard/>}/> : <Route exact path="/" element={<Home/>}/>}
                    <Route exact path="/user/signIn" element={<SignIn/>}/>
                    <Route exact path="/user/signUp" element={<SignUp/>}/>
                    <Route exact path="/user/myCart" element={<Cart/>}/>
                    <Route exact path="/user/profile" element={<UserProfile/>}/>
                    <Route exact path="/user/myOrders" element={<Orders/>}/>
                    <Route exact path="/user/addNew" element={<AddNew/>}/>
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