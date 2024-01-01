import "./Auth.css";
import { Link } from "react-router-dom";
import { AuthData } from "../../AuthContext/AuthWrapper";

function SignIn(){
    const { handleSignIn } = AuthData();

    return (
        <div className="flex-center auth-container">
            <div className="auth-form">
                <img src="/images/user.png" alt="User Png" height="150px" width="150px" />
                <h2>Sign In to your Account</h2>
                <form id="sign-in" className="flex-center" method="post" onSubmit={handleSignIn}>

                    {/* Email Field */}
                    <div className="form-group">
                        <input type="email" className="form-control" id="inputEmail" placeholder="Email" name="email" required />
                    </div>

                    {/* <Password Field */}
                    <div className="form-group">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" name="password" required />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="form-group forgotPswd">
                        <a id="forgot-password" href="/users/forgot-password">Forgot Password</a>
                    </div>

                    {/* Sign In Button */}
                    <div className="flex-center form-group">
                        <button type="submit" className="flex-center btn btn-primary">
                            <i className="fas fa-sign-in-alt"></i>
                            Sign In
                        </button>
                    </div> 

                    {/* Google Button */}
                    <div className="flex-center form-group">
                        <Link to="/users/auth/google" className="flex-center btn btn-primary">
                            <img src="/images/google.png" alt="Google" height="25px" width="25px" />
                            &nbsp;
                            Continue with Google
                        </Link>
                    </div>

                </form>

                {/* Sign Up Link */}
                <p>
                    Don't have an account? <Link to="/user/signUp">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default SignIn;