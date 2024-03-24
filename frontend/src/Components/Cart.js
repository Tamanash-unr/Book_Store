import "./Cart.css";
import CartItemCard from "./Cards/CartItemCard";
import { AuthData } from "../AuthContext/AuthWrapper";
import { useEffect, useState } from "react";

function Cart(){
    const { fetchUserCart } = AuthData();
    const [cartItems, setCartItems] = useState({items: [], itemData: {}});

    useEffect(()=>{
        populateUserCart();
    },[]);

    useEffect(()=>{console.log(cartItems)},[cartItems]);

    async function populateUserCart(){
        let userCart = await fetchUserCart(true);

        setCartItems(userCart);
    } 

    const getTotalPrice = () =>{
        let price = 0;

        cartItems.items.forEach(item => {
            price += item.price * cartItems.itemData[item._id]
        })

        return price;
    };

    function updateCartItemQty(itemId, qty){
        const updatedCart = {...cartItems};

        updatedCart.itemData[itemId] = qty;
        setCartItems(updatedCart);
    }

    function removeItemFromCart(item){
        const newCart = {...cartItems};
        const itemIndex = newCart.items.indexOf(item);

        newCart.items.splice(itemIndex,1)
        console.log(newCart.items);

        delete  newCart.itemData[item._id];

        setCartItems(newCart);
    }

    let addonCharge = 5;
    let taxPrice = 5;

    return (
        <div className="cart-container">
            <div className="cartItems-container">
                <div className="card-header">
                    <h2>My Cart</h2>
                </div>
                {
                    cartItems.items.length === 0 && 
                    <div className="empty-cart">
                        <h3>No Items in Cart!</h3>
                    </div>
                }
                {   
                    cartItems.items.length > 0 &&
                    cartItems.items.map((item) => {
                        return <CartItemCard key={item._id} cardData={item} qtyData={cartItems.itemData[item._id]} updateItemQty={updateCartItemQty} removeItemFromCart={removeItemFromCart} />
                    })
                }
            </div>
            <div className="cartDetail-container">
                <div className="cardDetail-Main">
                    <div className="card-header">
                        <h2>Price Details</h2>
                    </div>
                    <div className="cartDetail-text">
                        <div>Price</div>
                        <div>
                            <i className="fas fa-indian-rupee-sign"/>
                            {getTotalPrice()}
                        </div>
                    </div>
                    <div className="cartDetail-text">
                        <div>Additional Charges</div>
                        <div>
                            <i className="fas fa-indian-rupee-sign"/>
                            {addonCharge}
                        </div>
                    </div>
                    <div className="cartDetail-text">
                        <div>Taxes</div>
                        <div>
                            <i className="fas fa-indian-rupee-sign"/>
                            {taxPrice}
                        </div>
                    </div>
                    <hr/>
                    <div className="cartDetail-text cart-total">
                        <div>Total</div>
                        <div>
                            <i className="fas fa-indian-rupee-sign"/>
                            {getTotalPrice()+addonCharge+taxPrice}
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary flex-center">Place Order</button>
            </div>
        </div>
    );
}

export default Cart;