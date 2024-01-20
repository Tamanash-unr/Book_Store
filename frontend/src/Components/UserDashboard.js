import "./UserDashboard.css";
import { useState, useEffect } from "react";
import { Slide } from 'react-slideshow-image';
import BookCard from "./Cards/SimpleBookCard";
import { AuthData } from "../AuthContext/AuthWrapper";

function Dashboard(){
    const { user, getBooks } = AuthData();
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        getBooksFromServer();
    }, [])

    const arrows = {
        prevArrow: <button className="fas fa-caret-left slide-arrow"/>,
        nextArrow: <button className="fas fa-caret-right slide-arrow"/>
    };

    async function getBooksFromServer(){
        const newBooks = await getBooks(1, 5);

        setBooks(newBooks.data);
    }

    function getCards(){
        if(books.length > 0){
            let cards = [];

            books.map((book) => {
                cards.push(<BookCard key={book._id} isSimple={true} book={book}/>);
            })

            return <Slide slidesToShow={5} autoplay={false} {...arrows}>{cards}</Slide>;
        }
    }

    return (
        <div className="dashboard-container">
            <h1>Welcome! {user.name}</h1> 
            <div className="dashboard-card">
                <div className="card-header">
                    <h2>
                        <i className="fa fa-clock"/>
                        &nbsp;
                        Recently Added
                    </h2>
                </div>
                {/* <Slide slidesToShow={5} autoplay={false} children={getCards()} {...arrows} /> */}
                {getCards()}
            </div>
            <div className="dashboard-card">
                <div className="card-header">
                    <h2>
                        <i className="fa fa-fire"/>
                        &nbsp;
                        Hot Picks
                    </h2>
                </div>
                <Slide slidesToShow={5} autoplay={false} {...arrows}>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                </Slide>
            </div>
            <div className="dashboard-card">
                <div className="card-header">
                    <h2>
                        <i className="fa fa-clock-rotate-left"/>
                        &nbsp;
                        Last Viewed
                    </h2>
                </div>
                {/* <Slide slidesToShow={5} autoplay={false} {...arrows}>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                </Slide> */}
                <div className="null-card">
                    <p>Nothing to show here.</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;