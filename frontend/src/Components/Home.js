import "./Home.css";
import BookCard from "./SimpleBookCard";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function Home() {

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
                <Slide slidesToScroll={1} slidesToShow={3} duration={2000} arrows={false} onStartChange={doOnChange}>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                    <BookCard isSimple={true}/>
                </Slide>
            </div>
        </div>
    );
}

export default Home;