import "./SimpleBookCard.css";
import { useNavigate } from "react-router-dom";

function BookCard(props){
    const {isSimple, book} = props;
    const navigate = useNavigate();

    let defImage = "https://firebasestorage.googleapis.com/v0/b/cn-cart-884a6.appspot.com/o/Public%2FThumb_Book.PNG?alt=media";
    let bestseller = !book ? false : book.bestseller;

    const Goto = () => {
        const url = `/book/${book._id}`;
        navigate(url);
    }

    return (
        <div className="book-card" onClick={Goto}>
            {bestseller && 
                <div className="book-tag">
                    <img src="/images/best-seller.png" alt="Bestseller..."/>
                </div>
            }
            <div className="book-image">
                <img src={!book ? defImage : book.image} alt="Book..."/>
            </div>
            <div className="book-content">
                <h3>{!book ? 'Title' : book.title}</h3>
                <span>{!book ? 'Author' : book.author}</span>
                {!isSimple && <span>Published - {book.year}</span>}
                {!isSimple && 
                    <div className="book-price">
                        <div>
                            <i className="fas fa-indian-rupee-sign"/>
                            {!book ? '200' : book.price}
                        </div>
                        <button className="btn btn-primary flex-center fas fa-cart-plus"/>
                    </div>
                }
            </div>
        </div>
    );
}

export default BookCard;