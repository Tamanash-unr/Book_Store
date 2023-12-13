function SignUp(){
    return (
        <div class="flex-center auth-container">
            <div class="auth-form">
                <img src="/images/user.png" alt="User Png" height="150px" width="150px" />
                <h2>Sign Up</h2>
                <form id="sign-up" class="flex-center" action="/users/create-user" method="POST">

                    {/* Name Field */}
                    <div class="form-group">
                        <input type="text" class="form-control" id="inputEmail" placeholder="Name" name="name" required />
                    </div>

                     {/* Email Field  */}
                    <div class="form-group">
                        <input type="email" class="form-control" id="inputEmail" placeholder="Email" name="email" required />
                    </div>

                     {/* Password Field  */}
                    <div class="form-group">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Password" name="password" required />
                    </div>

                     {/* Confirm Password  */}
                    <div class="form-group">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Confirm Password" name="confirmPassword" required />
                    </div>

                     {/* Sign Up Button  */}
                    <div class="flex-center form-group">
                        <button type="submit" class="flex-center btn btn-primary">
                            <i class="fas fa-user-plus"></i>
                            &nbsp;
                            Sign Up
                        </button>
                    </div>  
                    
                     {/* Google Sign In/Sign Up  */}
                    <div class="flex-center form-group">
                        <a href="/users/auth/google" class="flex-center btn btn-primary">
                            <img src="/images/google.png" alt="Google" height="25px" width="25px" />
                            &nbsp;
                            Continue with Google
                        </a>
                    </div>
                </form>

                 {/* Sign In Link  */}
                <p>
                    Already have an account? <a href="/users/signIn">Sign In</a>
                </p>
            </div>
        </div>
    )
}

export default SignUp;