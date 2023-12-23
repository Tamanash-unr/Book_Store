import "./NavOptions.css";
import { Link } from "react-router-dom";

function NavOptions(){
    let optionsToggled = false;

    function onDropdownClick(){
        if(!optionsToggled){
            document.getElementById("gear-icon").classList.add("gear-anim");
            document.getElementById("opt-list").classList.add("dropdown-anim");
            optionsToggled = true;
        } else {
            document.getElementById("gear-icon").classList.remove("gear-anim");
            document.getElementById("opt-list").classList.remove("dropdown-anim");
            optionsToggled = false;
        }
    }

    return (
        <div className="nav-options" onClick={onDropdownClick}>
            <i id="gear-icon" className="fas fa-gear fa-xl" />
            <ul id="opt-list" className="nav-optContainer">
                <li>
                    <Link className="opt-listItem" to={"/user/profile"}>
                        <i className="fas fa-user"/>
                        My Profile
                    </Link>
                </li>
                <li>
                    <Link className="opt-listItem" to={"/user/myOrders"}>
                        <i className="fas fa-box"/>
                        My Orders
                    </Link>
                </li>
                <li>
                    <Link className="opt-listItem beta" to={"/user/addNew"}>
                        <i className="fas fa-file-circle-plus"/>
                        Add New Book
                        &nbsp;
                        <small>BETA</small>
                    </Link>
                </li>
                <li>
                    <Link className="opt-listItem" to={"/user/signOut"}>
                        <i className="fas fa-right-from-bracket"/>
                        Sign Out
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default NavOptions;