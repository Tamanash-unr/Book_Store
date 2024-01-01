import { Link } from "react-router-dom";
import { AuthData } from "../../AuthContext/AuthWrapper";

function SignUp(){
    const { handleSignUp } = AuthData();

    return (
        <div className="flex-center auth-container">
            <div className="auth-form">
                <img src="/images/user.png" alt="User Png" height="150px" width="150px" />
                <h2>Sign Up</h2>
                <form id="sign-up" className="flex-center" method="POST" onSubmit={handleSignUp}>

                    {/* Name Field */}
                    <div className="form-group">
                        <input type="text" className="form-control" id="inputName" placeholder="Name" name="name" required />
                    </div>

                     {/* Email Field  */}
                    <div className="form-group">
                        <input type="email" className="form-control" id="inputEmail" placeholder="Email" name="email" required />
                    </div>

                     {/* Password Field  */}
                    <div className="form-group">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" name="password" required />
                    </div>

                     {/* Confirm Password  */}
                    <div className="form-group">
                        <input type="password" className="form-control" id="inputCnfPassword" placeholder="Confirm Password" name="confirmPassword" required />
                    </div>

                     {/* Sign Up Button  */}
                    <div className="flex-center form-group">
                        <button type="submit" className="flex-center btn btn-primary">
                            <i className="fas fa-user-plus"></i>
                            &nbsp;
                            Sign Up
                        </button>
                    </div>  
                    
                     {/* Google Sign In/Sign Up  */}
                    <div className="flex-center form-group">
                        <Link to="/users/auth/google" className="flex-center btn btn-primary">
                            <img src="/images/google.png" alt="Google" height="25px" width="25px" />
                            &nbsp;
                            Continue with Google
                        </Link>
                    </div>
                </form>

                 {/* Sign In Link  */}
                <p>
                    Already have an account? <Link to="/user/signIn">Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp;