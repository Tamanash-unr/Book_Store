import "./OrderCard.css";

function OrderCard(){
    return (
        <li className="order-card">
            <div>
                <h3>Order No</h3>
                <p>Delivered By:</p>
                <p>Order Status:</p>
            </div>
            <button className="order-cancelBtn">
                <i className="fas fa-close"/>
                Cancel Order
            </button>
        </li>
    )
}

export default OrderCard;