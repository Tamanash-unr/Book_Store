import { useState } from "react";
import "./CartItemCard.css";    

function CartItemCard(){

    const [qty, setQty] = useState(1);

    function increaseQty(){
        let newQty = qty + 1;
        setQty(newQty);
    }

    function decreaseQty(){
        let newQty = qty - 1;

        if(newQty <= 0){
            setQty(1);
        } else {
            setQty(newQty);
        }
    }

    return (
        <div className="cartItem-card">
            <div>
                <h3 className="cartItem-cardHead">Item Name</h3>
                <p className="cartItem-cardText">Author</p>
                <p className="cartItem-cardText">Seller</p>
                <h3>Price</h3>
                <button className="btn btn-primary flex-center cartItem-remove">Remove from Cart</button>
            </div>
            <div>
                <img className="cartItem-cardImg" src="https://firebasestorage.googleapis.com/v0/b/cn-cart-884a6.appspot.com/o/Public%2FThumb_Book.PNG?alt=media" alt="Book..."/>
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