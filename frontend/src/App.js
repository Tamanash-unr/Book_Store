import "./App.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Footer } from "./Components";
import AuthWrapper from "./AuthContext/AuthWrapper";


function App(){
    return (
        <div className="main-container">
            <AuthWrapper />
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover={false}
                progressClassName="toast-ProgressBar"
            />
            <Footer />
        </div>
    );
}

export default App;