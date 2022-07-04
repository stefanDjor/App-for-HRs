import React from "react";
import './Header.css';
import logo from "../../assets/quantox-logo.png"
import { Link } from "react-router-dom";


const Header = () => {
    
    return (
        <header>
            <div className="q-logo">
                <img className="logo" src={logo} alt="logo"/>
            </div>
            <div className="page-links-header">
                <Link className="link-header" to="/">Login</Link>
                <Link className="link-header" to="/register">Register</Link>
            </div>
        </header>
    );
}

export default Header;