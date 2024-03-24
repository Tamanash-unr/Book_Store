import "./Home.css";
import { useState, useEffect } from "react";
import BookCard from "./Cards/SimpleBookCard";
import { AuthData } from "../AuthContext/AuthWrapper";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function Home() {
    const { getBooks } = AuthData();
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        getBooksFromServer();
    },[])

    async function getBooksFromServer(){
        const newBooks = await getBooks(1, 5);

        setBooks(newBooks.data)
    }

    function getBookCards(){
        if(books.length > 0){
            let cards = [];

            books.map((book) => {
                cards.push(<BookCard key={book._id} isSimple={true} book={book}/>);
            })

            return <Slide slidesToScroll={1} slidesToShow={3} duration={2000} arrows={false}>{cards}</Slide>;
        } else {
            return (
                <Slide slidesToScroll={1} slidesToShow={3} duration={2000} arrows={false}>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                </Slide>
            )
        }
    }

    const doOnChange = () => {
        let slideArr = document.getElementsByClassName("active");
        if(slideArr.length > 1 && slideArr[2] !== undefined){
            slideArr[1].classList.remove("slide-center");
            slideArr[2].classList.add("slide-center");
            console.log(slideArr.length)
        }
        
        if(slideArr[2] === undefined && slideArr[1] !== undefined){
            slideArr[1].classList.remove("slide-center");
            // document.querySelector('[data-index="6"]').classList.add("slide-center");
        }
    }

    return (
        <div className="homeContainer">
            <div className="home-content">
                <h1>Find your next favourite Book Here!</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div className="home-slide">
                {getBookCards()}
            </div>
        </div>
    );
}

export default Home;