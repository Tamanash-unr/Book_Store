import { Link } from "react-router-dom"; 
import "./Logo.css";

function Logo(){
    return (
        <Link to="/" className="logo">
            <h1>Book Store</h1>
            <img src="/images/Book.svg" alt="Book..."/>
        </Link>
    );
}

export default Logo;