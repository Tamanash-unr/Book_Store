import "./UserProfile.css";
import { Link } from "react-router-dom";
import { AuthData } from "../AuthContext/AuthWrapper";

function UserProfile(){
    const { user, handleSignOut } = AuthData();

    return (
        <div className="profile-container">
            <div className="profile-menu">
                <text>Hello,</text><br/>
                <strong className="profile-username">{user.name}</strong>
                <hr/>
                <div className="profile-list">
                    <ul type="none">
                        <li className="profile-listitem">
                            <button>
                                <i className="fas fa-user-shield" />
                                Account Security
                            </button>
                        </li>
                        <li className="profile-listitem">
                            <button>
                                <i className="fas fa-address-card" />
                                Manage Addresses
                            </button>
                        </li>
                    </ul>
                    <Link to="/" onClick={handleSignOut}>
                        <i className="fas fa-right-from-bracket"/>
                        Sign Out
                    </Link>
                </div>
            </div>
            <div className="profile-main">
                <h1>Personal Info</h1>
                <form id="update-info" action="POST">
                    <input type="text" placeholder="First Name"/>
                    <input type="text" placeholder="Last Name"/>
                    <button className="btn btn-primary flex-center" type="submit">Update</button>
                </form>
                <h1>Account Info</h1>
                <form id="update-credentials" action="POST">
                    <input type="email" placeholder="Email" required/>
                    <input type="password" placeholder="Password" required/>
                    <button className="btn btn-primary flex-center" type="submit">Update</button>
                </form>
                <h2>FAQs</h2>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </div>
        </div>
    )
}

export default UserProfile;