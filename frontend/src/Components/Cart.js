import "./Cart.css";
import CartItemCard from "./Cards/CartItemCard";

function Cart(){

    let price = 2000;
    let addonCharge = 5;
    let taxPrice = 5;

    return (
        <div className="cart-container">
            <div className="cartItems-container">
                <div className="card-header">
                    <h2>My Cart</h2>
                </div>
                <CartItemCard />
                <CartItemCard />
                <CartItemCard />
            </div>
            <div className="cartDetail-container">
                <div className="cardDetail-Main">
                    <div className="card-header">
                        <h2>Price Details</h2>
                    </div>
                    <div className="cartDetail-text">
                        <div>Price</div>
                        <div>${price}</div>
                    </div>
                    <div className="cartDetail-text">
                        <div>Additional Charges</div>
                        <div>${addonCharge}</div>
                    </div>
                    <div className="cartDetail-text">
                        <div>Taxes</div>
                        <div>${taxPrice}</div>
                    </div>
                    <hr/>
                    <div className="cartDetail-text cart-total">
                        <div>Total</div>
                        <div>${price+addonCharge+taxPrice}</div>
                    </div>
                </div>
                <button className="btn btn-primary flex-center">Place Order</button>
            </div>
        </div>
    );
}

export default Cart;