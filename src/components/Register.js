import React, { useState, useEffect } from "react";
import './Login.css';
import Header from "./layout/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../redux/action/ActionCreators";
import axios from "axios";
// import HeaderLog from "./layout/HeaderLog";


const Register = () => {


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(null);
    const [role, setRole] = useState("company_user");
    const [company, setCompany] = useState(null);
    // console.log("Ovde smo uneli novu kompaniju");
    // console.log(company);

    const [formIsValid, setFormIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const statusCode = props.state.registerReducer.response === undefined ? 0 : props.state.registerReducer.response.status;


    useEffect(() => {
        setFormIsValid(
            username.trim().length > 3
            && email.includes('@')
            && password.trim().length > 5
        );
        // console.log(username, email, password)
    }, [username, email, password]);

    // useEffect(() => {
    //     if (newUser && newUser.id) {
    //         navigate('/home');
    //         setUsername('');
    //         setEmail('');
    //         setPassword('')
    //     }
    // }, [newUser]);



    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleRole = (event) => {
        setRole(event.target.value)
    }



    // COMPANY

    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        axios.get(
            "https://strapi-internship-hr-app.onrender.com/api/companies?pagination[pageSize]=1000"
        ).then((response) => {
            // console.log("sta nam kaze ova kompanija u RESPONSE?", response)
            setCompanies(response.data.data)
        })
    }, [setCompanies]);
    // console.log('proba ispod koda...', companies)



    const [modal, setModal] = useState(false);

    const toggleModal = (event, modalIsOpen) => {
        // console.log(event);
        event.preventDefault();
        setModal(modalIsOpen)
        setNewCompany('')
    }
    // const  [ id, setId ] = useState('');

    const [slug, setSlug] = useState('');
    const [newCompany, setNewCompany] = useState('');
    // console.log(newCompany)

    const companyChangeHandler = (event) => {
        // setNewCompany({newCompany:event.target.value});
        setNewCompany(event.target.value);
        // console.log(event.target.value)
    }


    const slugChangeHandler = (event) => {
        setSlug(event.target.value);
    }

    const handleCompany = (event) => {
        if (newCompany.trim().length === 0) {
            return;
        }
    }


    
    // UPLOAD PHOTO

    const [badFormat, setBadFormat] = useState(false);

    // const [loading, setLoading] = useState(false);
    const handlePhoto = (event) => {
        const uploadPhoto = event.target.files[0];
        // console.log(uploadPhoto);

        const photoType = ["image/jpeg", "image/png", "image/gif"];
        if (!photoType.some((type) =>
            uploadPhoto.type === type)
            && uploadPhoto !== null) {
            return setBadFormat(true);
        }
        setBadFormat(false);

        const photoData = new FormData();
        photoData.append("files", uploadPhoto);
        setPhoto(photoData)
    }



    // REGISTER BUTTON

    const onRegister = (event) => {
        event.preventDefault()
        if (username.trim().length === 0 || !email.includes('@') || password.trim().length < 5) {
            console.log("Greska prilikom registrovanja")
            return errorMessage;
        } else {
            dispatch(actionCreators.registerUser({
                username,
                email,
                password,
                photo,
                newCompany,
                role
            }))
            // const token = localStorage.getItem("token");
            setUsername('');
            setEmail('');
            setPassword('');
            setCompany('')
            navigate("/home");
        }
    };


    return (
        <div className="login-form">
            <Header />
            <main>
                <section className="sec-reg">
                    <h2>
                        uTeam - Register
                    </h2>

                    {/* USERNAME */}
                    <form className="form" method="POST">
                        <div className="login-page">
                            <label className="title-email-pass">Username</label>
                            <input
                                type='text'
                                placeholder="Username"
                                value={username}
                                onChange={handleUsername}
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="login-page">
                            <label className="title-email-pass">Email</label>
                            <input
                                type='email'
                                placeholder="Email"
                                required
                                value={email}
                                onChange={handleEmail}
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="login-page">
                            <label className="title-email-pass">Password</label>
                            <input
                                type='password'
                                placeholder="Password"
                                required
                                value={password}
                                onChange={handlePassword}
                            />
                        </div>

                        {/* PHOTO */}
                        <div className="login-page">
                            <label className="title-email-pass">Profile Photo</label>
                            <input className="choose-file"
                                type="file"
                                name="file"
                                // accept="image/*"
                                placeholder="Upload photo"
                                onChange={event => handlePhoto(event)}
                            />
                        </div>


                        {/* COMPANY */}
                        <div className="login-page">
                            <label className="title-email-pass">Company</label>

                            <div className="company-flex">

                                <select
                                    className="section-options"
                                    // onChange={(event) =>
                                        // setNewCompany(event.target.value)}
                                        onChange={(event) => {
                                            companyChangeHandler(event)
                                        }}
                                    defaultValue=""
                                >
                                    <option className="light-txt" value="" disabled>
                                        Choose company
                                    </option>
                                    {companies != undefined &&
                                        companies.map(company => {
                                            return (
                                                <option key={company.id} 
                                                        value={company.id}>
                                                        {company.attributes.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>

                                <button className="button-company"
                                    onClick={(event) => toggleModal(event, true)}
                                >
                                    Add company
                                </button>

                            </div>

                            <div className="company-modal" style={{ display: modal ? "flex" : "none" }}>

                                <label>Add new company name</label>
                                <input
                                    type="text"
                                    placeholder="Enter company name"
                                    value={newCompany}
                                    onChange={companyChangeHandler}
                                />

                                <button className="button button-modal"
                                    // type="submit"
                                    onClick={(event) => {
                                        toggleModal(event, false)
                                        // handleCompany()
                                    }}
                                >
                                    Close
                                </button>
                            </div>

                        </div>



                        {/* ROLE */}
                        <div className="login-page">
                            <p className="select-role">Select your role:</p>
                            <div className="radio-btn">
                                <div className="role">
                                    <input
                                        type="radio"
                                        value={"company_user"}
                                        name="role"
                                        onChange={event => handleRole(event)}
                                        defaultChecked
                                    />
                                    <label className="admin-user">User</label>
                                </div>
                                <div className="role">
                                    <input
                                        type="radio"
                                        value={"company_admin"}
                                        name="role"
                                        onChange={event => handleRole(event)}
                                    />
                                    <label className="admin-user">Admin</label>
                                </div>
                            </div>
                        </div>

                        <div className="login-page__actions">
                            <Link className="acc-text" to="/">
                                Already have an account?
                            </Link>
                            <button className="button"
                                type="submit"
                                onClick={onRegister}
                            >
                                Register
                            </button>

                        </div>
                        {!errorMessage && <div className="error-message">Check Your Data!</div>}

                        {/* {loading ? (
                            <h3>Loading...</h3>
                        ) : (
                            <img src="{image}"/>
                        )} */}
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Register