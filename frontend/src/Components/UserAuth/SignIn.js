import "./Auth.css";

function SignIn(){
    return (
        <div class="flex-center auth-container">
            <div class="auth-form">
                <img src="/images/user.png" alt="User Png" height="150px" width="150px" />
                <h2>Sign In to your Account</h2>
                <form id="sign-in" class="flex-center" action="/users/create-user-session" method="post">

                    {/* Email Field */}
                    <div class="form-group">
                        <input type="email" class="form-control" id="inputEmail" placeholder="Email" name="email" required />
                    </div>

                    {/* <Password Field */}
                    <div class="form-group">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Password" name="password" required />
                    </div>

                    {/* Forgot Password Link */}
                    <div class="form-group forgotPswd">
                        <a id="forgot-password" href="/users/forgot-password">Forgot Password</a>
                    </div>

                    {/* Sign In Button */}
                    <div class="flex-center form-group">
                        <button type="submit" class="flex-center btn btn-primary">
                            <i class="fas fa-sign-in-alt"></i>
                            Sign In
                        </button>
                    </div> 

                    {/* Google Button */}
                    <div class="flex-center form-group">
                        <a href="/users/auth/google" class="flex-center btn btn-primary">
                            <img src="/images/google.png" alt="Google" height="25px" width="25px" />
                            &nbsp;
                            Continue with Google
                        </a>
                    </div>

                </form>

                {/* Sign Up Link */}
                <p>
                    Don't have an account? <a href="/user/signUp">Sign Up</a>
                </p>
            </div>
        </div>
    )
}

export default SignIn;