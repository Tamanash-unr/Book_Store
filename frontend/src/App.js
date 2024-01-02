import "./App.css";
import { Footer } from "./Components";
import AuthWrapper from "./AuthContext/AuthWrapper";

function App(){
    return (
        <div className="main-container">
            <AuthWrapper />
            <Footer />
        </div>
    );
}

export default App;