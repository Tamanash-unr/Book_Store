import "./MyOrders.css";
import OrderCard from "./OrderCard";

function Orders(){
    let orderNum = 0;

    return (
        <div className="orders-container">
            {/* <OrderCard />
            <OrderCard />
            <OrderCard /> */}
            <div className="null-card">
                <p>No orders yet.</p>
            </div>
        </div>
    );
}

export default Orders;