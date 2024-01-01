import "./UserDashboard.css";
import { Slide } from 'react-slideshow-image';
import BookCard from "./Cards/SimpleBookCard";
import { AuthData } from "../AuthContext/AuthWrapper";

function Dashboard(){
    const { user } = AuthData();

    const arrows = {
        prevArrow: <button className="fas fa-caret-left slide-arrow"/>,
        nextArrow: <button className="fas fa-caret-right slide-arrow"/>
    };

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
                <Slide slidesToShow={5} autoplay={false} {...arrows}>
                    <BookCard isSimple={true}/>
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