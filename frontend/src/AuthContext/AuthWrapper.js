import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";
import { Navbar, Loading } from "../Components";
import NavPages from "../NavStructure/Navigation";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

function AuthWrapper(){
    // React State Hooks
    const [cartItems, setCartItems] = useState({items: [], itemData: {}}); /* State hook for Cart */
    const [user, setUser] = useState({name:'',isLoggedIn:false});
    const [isLoading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
    const navigate = useNavigate();

    // Use to store ref Id for current toast
    const toastId = React.useRef(null);    

    useEffect(()=>{
        if(!validateToken()){
            handleSignOut(false);
        }
    },[]);

    /*---- Handle User Sign In ----*/
    async function handleSignIn(evt){
        evt.preventDefault();

        // Sign In Form Data
        const formData = {
            email: document.getElementById("inputEmail").value,
            password: document.getElementById("inputPassword").value,
        }
        
        // Create New Toast and store ref Id
        toastId.current = toast("Signing In", {autoClose: false, isLoading: true}); 
        
        // FetchAPI call for Signing In
        const data = await fetch("http://localhost:8080/userApi/sign-in",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(formData)
        })

        // Convert API result to JSON 
        const response = await data.json();
        // const logUser = {name: response.user, isLoggedIn: true};

        // Update Toast using ref Id based on Status of API result
        setTimeout(()=>{
            if(data.status === 200){
                toast.update(toastId.current, {type: toast.TYPE.SUCCESS, autoClose: 2000, render: response.message, isLoading: false} );
                setCookie("user_token", response.token, {path: '/'});
                setUser({...response.user, isLoggedIn: true});
                navigate("/");
                console.log(cookies)
            } else {
                toast.update(toastId.current, {type: toast.TYPE.ERROR, autoClose: 2000, render: response.message, isLoading: false} )
            }
        }, 500);
    }
    
    /*---- Handle User Sign Up ----*/
    async function handleSignUp(evt){
        evt.preventDefault();

        // Sign Up Form Data
        const formData = {
            name: document.getElementById("inputName").value,
            email: document.getElementById("inputEmail").value,
            password: document.getElementById("inputPassword").value,
            confirmPassword: document.getElementById("inputCnfPassword").value
        }
        
        // Create New Toast and store ref Id
        toastId.current = toast("Creating New User", {autoClose: false, isLoading: true}); 
        
        // FetchAPI call for Sign Up
        const data = await fetch("http://localhost:8080/userApi/sign-up",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(formData)
        })

        // Convert API result to JSON 
        const response = await data.json();

        // Update Toast using ref Id based on Status of API result
        setTimeout(()=>{
            if(data.status === 200){
                toast.update(toastId.current, {type: toast.TYPE.SUCCESS, autoClose: 2000, render: response.message, isLoading: false} );
                navigate('/user/signIn');
            } else {
                toast.update(toastId.current, {type: toast.TYPE.ERROR, autoClose: 2000, render: response.message, isLoading: false} )
            }
        }, 500);
    }

    /*---- Handle User Sign Out ----*/
    function handleSignOut(showToast = true){
        removeCookie('user_token');
        setUser({name:'',isLoggedIn: false})
        navigate('/');

        if(showToast){
            toast.success("Signed Out!");
        }
    }

    /*---- Validate current user Token ----*/
    async function validateToken(){
        setLoading(true);

        const token = cookies.user_token;

        const req = await fetch("http://localhost:8080/userApi/validateToken",{
            method:'GET',
            headers: {
                "jwt_auth_token": token
             }
        });

        // Convert API result to JSON 
        const response = await req.json();

        if(req.status === 200){
            setUser({...response.user, isLoggedIn: true});
            setLoading(false);
            return true;
        } else {
            setLoading(false);
            return false
        }
    }

    async function handleAddToCart(item){
        const newCart = {...cartItems};
        const token = cookies.user_token;

        if (!newCart.items.includes(item)){
            newCart.items.push(item);
            newCart.itemData[item] = 1;

            const data = await fetch("http://localhost:8080/userApi/updateCart",{
                method:'POST',
                headers: {
                    "Content-Type":  "application/json",
                    "jwt_auth_token": token
                },
                body: JSON.stringify(newCart)
            });

            setCartItems(newCart);

            return data.status;
        }
    }

    async function fetchUserCart(populateCart = false){
        const token = cookies.user_token;

        const data = await fetch("http://localhost:8080/userApi/getUserCart",{
            method:"GET",
            headers: {
                "jwt_auth_token": token,
                "populate": populateCart
            }
        })

        if (data.status === 200){
            const response = await data.json();

            const userCart = {
                items: response.cart.cartItems,
                itemData: response.cart.cartItemsData
            }

            if(!populateCart){
                setCartItems(userCart);
            } else {
                return userCart;
            }
        } else {
            return {};
        }
    }

    async function getBooks(pageNo, paginationLimit = 10 ){
        const url = "http://localhost:8080/booksApi/books/" + pageNo + "/" + paginationLimit;

        // FetchAPI call for getting Books
        const data = await fetch(url,{
            method:"GET"
        })

        const response = await data.json();
        
        return response;
    }

    return (
        <> 
            {isLoading && <Loading />}
            {!isLoading && 
            <AuthContext.Provider value={{handleSignIn, handleSignOut, handleSignUp, handleAddToCart, getBooks, fetchUserCart, cartItems, user, cookies, toast, toastId}}>
                <Navbar/>
                <NavPages />
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    pauseOnHover={false}
                    progressClassName="toast-ProgressBar"
                />
            </AuthContext.Provider>
            }
        </>
    );
}

export default AuthWrapper;