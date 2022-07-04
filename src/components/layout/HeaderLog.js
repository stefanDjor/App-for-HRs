import React from 'react'
import logo from "../../assets/quantox-logo.png"
import burger from "../../assets/burger menu black.png"
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as actionCreators from "../../redux/action/ActionCreators";

function HeaderLog() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const token = localStorage.getItem("token")
    // const id = localStorage.getItem("id")

    const logOut = () => {

        localStorage.removeItem("id")
        localStorage.removeItem("token")
        localStorage.removeItem('companyId')
        dispatch(actionCreators.logoutUser())
        dispatch(actionCreators.clearStore())
        navigate("/")
    }

    return (
        <header>
            <div className="q-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="page-links-header">
                <Link className="page-link home" to="/home">Home</Link>
                <Link className="page-link company" to="/company-info">Company</Link>
                <button className="page-link-btn" onClick={logOut}>
                    Logout
                </button>
            </div>
            <Link to="/menu">
                <div className="burger-logo">
                    <img className='burger' src={burger} alt="logo" />
                </div>
            </Link>
        </header>
    );
}

export default HeaderLog
