import "./SimpleBookCard.css";

function bookCard(props){
    let price = 200;
    let bestseller = false;

    return (
        <div className="book-card">
            {bestseller && 
                <div className="book-tag">
                    <img src="/images/best-seller.png" alt="Bestseller..."/>
                </div>
            }
            <div className="book-image">
                <img src="https://firebasestorage.googleapis.com/v0/b/cn-cart-884a6.appspot.com/o/BookStore%2FThumb_Book.PNG?alt=media" alt="Book..."/>
            </div>
            <div className="book-content">
                <h3>Book Name</h3>
                <span>Book Author</span>
                {!props.isSimple && <span>Published</span>}
                {!props.isSimple && 
                    <div className="book-price">
                        ${price}
                        <button className="btn btn-primary flex-center fas fa-cart-plus"/>
                    </div>
                }
            </div>
        </div>
    );
}

export default bookCard;