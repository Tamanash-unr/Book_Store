import { useState, useEffect } from "react";
import FilterPanel from "./Filter-Panel/FilterPanel";
import BookCard from "./Cards/SimpleBookCard";
import "./Books.css";

function Books(){
    const [books, setBooks] = useState([]);

    useEffect(()=>{

    },[]);

    return (
        <div className="booksMain-container">
            <FilterPanel />
            <div className="books-container">
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
            </div>
        </div>
    );
}

export default Books;