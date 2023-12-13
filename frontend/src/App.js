import { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Navbar, Home, SignIn, SignUp, Footer, NotFound, Books, About} from "./Components";
import "./App.css";

function App(){
    useEffect(()=>{
        console.log("component did mount");
    },[]);

    return (
        <div className="main-container">
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/users/signIn" element={<SignIn/>}/>
                    <Route exact path="/users/signUp" element={<SignUp/>}/>
                    <Route exact path="/books" element={<Books/>}/>
                    <Route exact path="/about" element={<About/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;