import "./BookDetails.css";
import { AuthData } from "../AuthContext/AuthWrapper";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BookDetails(){
    const { user, handleAddToCart, cartItems, toast } = AuthData();
    const [book, setBook] = useState();
    const {id} = useParams();
    const navigate = useNavigate();
    let defImage = "https://firebasestorage.googleapis.com/v0/b/cn-cart-884a6.appspot.com/o/Public%2FThumb_Book.PNG?alt=media";

    useEffect(()=>{
        fetchBookData();
    },[cartItems])

    async function fetchBookData(){
        const url = `http://localhost:8080/booksApi/books/${id}`;

        const data = await fetch(url, {method: 'GET'});

        const response = await data.json();

        if(data.status === 200){
            setBook(response);
        }
    }

    async function tryAddToCart(){
        if(!user.isLoggedIn){
           return navigate("/user/signIn");
        }

        const cart = await handleAddToCart(id);
        console.log(cart);
        
        if(cart > 400){
            toast.error("Failed Adding to Cart!")
        }
    }

    function removeFromCart(){

    }

    return (
        <div className="detail-container">
            <div className="book-image">
                <img src={!book ? defImage : book.image} alt="Book..."/>
            </div>
            <div className="book-info">
                <h1>{!book ? 'Book Title' : book.title}</h1>
                <h2>{!book ? 'Book Title' : book.author}</h2>
                <p>{!book ? 'Publish Date' : `Published - ${book.year}`}</p>
                <p>{!book ? 'Summary' : book.description}</p>
                {
                    !cartItems.items.includes(id) ?
                    <button className="btn btn-primary flex-center" onClick={() => tryAddToCart()}>
                        <i className="fas fa-cart-plus fa-xl"/>
                        <strong>Add to Cart</strong>
                    </button> :                    
                    <button className="btn btn-primary flex-center" onClick={() => removeFromCart()}>
                        <i className="fas fa-trash fa-xl"/>
                        <strong>Remove from Cart</strong>
                    </button>
                }
            </div>
        </div>
    )
}

export default BookDetails;