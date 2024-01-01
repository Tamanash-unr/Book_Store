import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";
import { Navbar } from "../Components";
import NavPages from "../NavStructure/Navigation";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

function AuthWrapper(){
    // React State Hooks
    const [cartItems, setCartItems] = useState([]); /* State hook for Cart */
    const [user, setUser] = useState({name:'',isLoggedIn:false});
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

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
        const data = await fetch("http://localhost:8080/booksApi/sign-in",{
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
        const data = await fetch("http://localhost:8080/booksApi/sign-up",{
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

    /*---- Handle User Sign Out ----*/
    async function validateToken(){
        const token = cookies.user_token;

        const req = await fetch("http://localhost:8080/booksApi/validateToken",{
            method:'GET',
            headers: {
                "jwt_header_token": token
             }
        });

        if(req.status === 200){
            return true
        } else {
            return false
        }
    }

    function handleAddToCart(){
        //add item to cart
    }

    return (
        <AuthContext.Provider value={{handleSignIn, handleSignOut, handleSignUp, cartItems, user}}>
            <Navbar/>
            <NavPages />
        </AuthContext.Provider>
    );
}

export default AuthWrapper;