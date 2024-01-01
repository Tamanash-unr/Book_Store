import { 
    Home, 
    Dashboard, 
    SignIn, 
    SignUp, 
    NotFound, 
    Books, 
    About, 
    Cart, 
    UserProfile, 
    Orders, 
    AddNew
} from "../Components";

import { Routes, Route, Navigate } from "react-router-dom";
import { AuthData } from "../AuthContext/AuthWrapper";

function NavPages(){
    const { user } = AuthData();

    const pages = [
        {path: "/books", element: <Books/>, isPrivate: false},
        {path: "/about", element: <About/>, isPrivate: false},
        {path: "/user/signIn", element: <SignIn />, isPrivate: false},
        {path: "/user/signUp", element: <SignUp />, isPrivate: false},
        {path: "/user/myCart", element: <Cart/>, isPrivate: true},
        {path: "/user/profile", element: <UserProfile />, isPrivate: true},
        {path: "/user/myOrders", element: <Orders />, isPrivate: true},
        {path: "/user/addNew", element: <AddNew />, isPrivate: true},
    ];

    return (
        <Routes>
            {user.isLoggedIn ? <Route exact path="/" element={<Dashboard user={user}/>}/> : <Route exact path="/" element={<Home/>}/>}
            {
                pages.map((obj, i) =>{
                    if(obj.isPrivate && user.isLoggedIn){
                        // If the route requires authentication and the user is logged in, render the component
                        return <Route exact path={obj.path} element={obj.element} key={i}/>
                    } else if(!obj.isPrivate) {
                        return <Route exact path={obj.path} element={obj.element} key={i}/>
                    } else { 
                        return <Route exact path={obj.path} element={ <Navigate to="/user/signIn"/> } key={i}/>;
                    }
                })
            }
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default NavPages;