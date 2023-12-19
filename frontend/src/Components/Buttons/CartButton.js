import { Link } from "react-router-dom";
import "./CartButton.css"

function CartButton(props){
    const { btnLink, btnClassName, fa_Icon, currentCartItems } = props;

    async function handleClick(evt){
        evt.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/books-api/test");
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            alert("Error: ", error);
        }
    }

    return (
        <Link to={btnLink} className={"btn-cart " + btnClassName}>
            {fa_Icon !== undefined && <i className={fa_Icon} />}
            {currentCartItems > 0 && <span className="cart-items">{currentCartItems}</span>}
        </Link>
    );
}

export default CartButton;