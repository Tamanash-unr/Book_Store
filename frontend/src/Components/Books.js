import { useState, useEffect } from "react";
import FilterPanel from "./Filter-Panel/FilterPanel";
import BookCard from "./Cards/SimpleBookCard";
import { AuthData } from "../AuthContext/AuthWrapper";
import "./Books.css";

function Books(){
    const { getBooks } = AuthData();
    const [currentPage, setCurrentpage] = useState(1);
    const [books, setBooks] = useState([]);
    const [maxPageCount, setMaxPageCount] = useState(0);
    const maxBooksToDisplay = 5;

    useEffect(()=>{
        getBooksFromServer();
    },[currentPage]);

    async function getBooksFromServer(setCount = true){
        const newBooks = await getBooks(currentPage, maxBooksToDisplay);

        setBooks(newBooks.data);
        if (setCount){
            setMaxPageCount(Math.ceil(newBooks.count/maxBooksToDisplay));
        }
    }

    function changePage(page){
        let changeToPage = currentPage + page;

        if(changeToPage > 0 && changeToPage <= maxPageCount){
            setCurrentpage(changeToPage);  
        }
    }

    return (
        <div className="booksMain-container">
            <FilterPanel />
            <div className="books-container">
                <div className="result-container">
                    {books.map((book)=>{
                        return <BookCard key={book._id} book={book} />;
                    })}
                </div>
                <div className="resultNav">
                    <button className="btn btn-primary flex-center" onClick={()=>changePage(-1)} disabled={currentPage > 1 ? false : true}>
                        Previous Page
                    </button>
                    <button className="btn btn-primary flex-center" onClick={()=>changePage(1)} disabled={currentPage === maxPageCount ? true : false}>
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Books;