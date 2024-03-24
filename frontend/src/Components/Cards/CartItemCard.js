import { useState } from "react";
import "./CartItemCard.css";    

function CartItemCard(props){
    const { cardData, qtyData, updateItemQty, removeItemFromCart } = props;

    const [qty, setQty] = useState(qtyData);
    const defaultImg = "https://firebasestorage.googleapis.com/v0/b/cn-cart-884a6.appspot.com/o/Public%2FThumb_Book.PNG?alt=media";

    function increaseQty(){
        let newQty = qty + 1;
        setQty(newQty);
        updateItemQty(cardData._id, newQty);
    }

    function decreaseQty(){
        let newQty = qty - 1;

        if(newQty <= 0){
            setQty(1);
            updateItemQty(cardData._id, 1);
        } else {
            setQty(newQty);
            updateItemQty(cardData._id, newQty);
        }
    }

    return (
        <div className="cartItem-card">
            <div>
                <h3 className="cartItem-cardHead">{!cardData ? "Item Name" : cardData.title}</h3>
                <p className="cartItem-cardText">{!cardData ? "Author" : cardData.author}</p>
                <p className="cartItem-cardText">Seller</p>
                <h3>
                    <i className="fas fa-indian-rupee-sign"/>
                    {!cardData ? "Price" : cardData.price * qty}
                </h3>
                <button className="btn btn-primary flex-center cartItem-remove" onClick={() => removeItemFromCart(cardData)}>
                    Remove from Cart
                </button>
            </div>
            <div>
                <img className="cartItem-cardImg" src={!cardData ? defaultImg : cardData.image} alt="Book..."/>
                <div className="cartItem-itemQty">
                    <button className="fas fa-minus fa-lg" onClick={decreaseQty}/>
                    <div className="cartItem-qtyText">{qty}</div>
                    <button className="fas fa-plus fa-lg" onClick={increaseQty}/>
                </div>
            </div>
        </div>
    );
}

export default CartItemCard;