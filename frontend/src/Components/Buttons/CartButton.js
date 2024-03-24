import { Link } from "react-router-dom";
import { AuthData } from "../../AuthContext/AuthWrapper";
import { useEffect } from "react";
import "./CartButton.css";

function CartButton(props){
    const { btnLink, btnClassName, fa_Icon } = props;
    const { cartItems, fetchUserCart} = AuthData();

    useEffect(()=>{
        fetchUserCart();
    },[])

    return (
        <Link to={btnLink} className={"btn-cart " + btnClassName}>
            {fa_Icon !== undefined && <i className={fa_Icon} />}
            {cartItems.items.length > 0 && <span className="cart-items">{cartItems.items.length}</span>}
        </Link>
    );
}

export default CartButton;