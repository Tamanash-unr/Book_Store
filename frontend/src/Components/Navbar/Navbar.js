import Logo from "./Logo";
import ButtonLink from "../Buttons/ButtonLink";
import CartButton from "../Buttons/CartButton";
import NavOptions from "./NavOptions";
import './Navbar.css';

function Navbar(props){
    let isLoggedIn = false;

    return (
        <div className="navbar flex-center">
            <Logo />
            <nav className="flex-center">
                <ul className="navList flex-center">
                    <li>
                        <ButtonLink btnLink="/" btnText="Home" btnClassName="navLinks"/>
                    </li>
                    <li>
                        <ButtonLink btnLink="/books" btnText="Books" btnClassName="navLinks" />
                    </li>
                    <li>
                        <ButtonLink btnLink="/books" btnText="Best Sellers" btnClassName="navLinks" />
                    </li>
                    <li>
                        <ButtonLink btnLink="/about" btnText="About" btnClassName="navLinks" />
                    </li>
                </ul>
            </nav>
            <div className="navUtils flex-center">
                {!isLoggedIn && <ButtonLink btnLink="/user/signIn" btnText="Sign In" btnClassName="navLinks" fa_Icon="fas fa-user" />}
                {isLoggedIn && 
                    <div className="flex-center">
                        <CartButton btnLink="/user/myCart" btnClassName="flex-center" fa_Icon="fas fa-cart-shopping fa-xl" currentCartItems={props.currentCartItems}/>
                        {/* <ButtonLink btnLink="/user/signOut" btnText="Sign Out" btnClassName="navLinks" fa_Icon="fas fa-right-from-bracket fa-lg" /> */}
                        <NavOptions/>
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;