import "./SimpleBookCard.css";

function bookCard(props){
    return (
        <div className="book-card">
            <div className="book-image">
                <img src="https://firebasestorage.googleapis.com/v0/b/cn-cart-884a6.appspot.com/o/BookStore%2FThumb_Book.PNG?alt=media" alt="Book..."/>
            </div>
            <div className="book-content">
                <h3>Book Name</h3>
                <span>Book Author</span>
                {!props.isSimple && <span>Published</span>}
                {!props.isSimple && <span>Price</span>}
            </div>
        </div>
    );
}

export default bookCard;