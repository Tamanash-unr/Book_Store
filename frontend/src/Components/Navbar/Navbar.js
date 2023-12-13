import Logo from "./Logo";
import ButtonLink from "../ButtonLink/ButtonLink";
import './Navbar.css';

function Navbar(){
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
                <ButtonLink btnLink="/users/signIn" btnText="Sign In" btnClassName="navLinks" fa_Icon="fas fa-user" />
            </div>
        </div>
    );
}

export default Navbar;