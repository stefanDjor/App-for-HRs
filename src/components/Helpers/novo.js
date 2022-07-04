// MY PROFILE

import React from 'react'
import './MyProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProfileRequest } from '../../redux/action/ActionCreators'


function MyProfile() {
 
    const id = localStorage.getItem("id"); 
    const user = useSelector((state) => state.user); 
    console.log("kako izgleda state?", user)

    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => 
    dispatch(fetchProfileRequest(id)), 1000 )}, [dispatch,id]);

// UPLOAD PHOTO
    const [ photo, setPhoto ] = useState(null);
    const [ badFormat, setBadFormat ] = useState(false);
    // const [loading, setLoading] = useState(false);
const handlePhoto = (event) => {
    const uploadPhoto = event.target.files[0];
    console.log(uploadPhoto);

    const photoType = [ "image/jpeg", "image/png", "image/gif" ];
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


const onRegister = (event) => {
    event.preventDefault()
    setPhoto(photo)
    }


  return (
    
    <div className="header-leftbar-right">
       <div className="my-profile">
            <h2 className="title-my-profile">My Profile</h2>

            <div className="container-left-right">

                <div className="left">
                    <div className="header-left">
                        <p className="header-title">Basic Info</p>
                    </div>

{/* NAME */}
                    <div className="left-main">
                        <p className="p-name-profile">
                            Name
                        </p>
                        <input className="input-name" 
                            type="text" 
                            placeholder="Name"
                            value={user !== undefined ? user.name : ""} 
                            onChange={(e) => setUser({ 
                                ...user, 
                                name: e.target.value })}
                        />

{/* PHOTO */}
                        <p className="p-name-profile">
                            Profile Photo
                        </p>
                        <input className="choose-file" 
                            type="file" 
                            placeholder="Upload photo"
                            onChange={event => handlePhoto(event)}
                        />
                         {user?.profilePhoto?.data === null || user?.profilePhoto?.data === undefined ? 
                         <p>Korisnik nema sliku</p> : 
                         <img src={user?.profilePhoto.data.attributes.url} 
                            alt={user?.profilePhoto.data.attributes.name} 
                            className="user-img" 
                            width={200} /> } 

                        <div className="but-div">
                            <button className="button">
                                Save
                            </button>
                        </div>    

                    </div>
                </div>

                <div className="right">
                    <div className="header-right">
                        <p className="header-title">Security</p>
                    </div>

{/* EMAIL */}
                    <div className="right-main">
                        <p className="p-name-profile">
                            Email:
                        </p>
                        <p className="email">
                            {user?.user?.data?.attributes.email}
                        </p>

{/* PASSWORD */}
                        <p className="p-name-profile">
                            Curent Password
                        </p>
                        <input className="input-name" 
                                type="password"  
                                placeholder="Curent password"
                        />
                        <p className="p-name-profile">
                            New Password
                        </p>
                        <input className="input-name" type="password"  placeholder="Enter new password"/>
                        <div className="but-div">
                            <button className="button"
                                onClick={onRegister}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
export default MyProfile;

// REDUCER
import initState from "./InitState";
import * as actions from "../action/ActionsTypes";
function reducer(state = initState, action) {
    switch (action.type) {

        case actions.REGISTER_USER:
            return state;
        case actions.REGISTER_USER_SUCCESS:
            console.log("ovo je akcija", action)
            console.log("ovo je state", state)
            return {...state, 
                user: {
                    username: action.payload.username,
                    email: action.payload.email,
                    role: '',
                    company: '',
                    profilePhoto: '',
                    id: '',
                    isAutenticated: true
                }
            }
        case actions.REGISTER_USER_FAILURE:
            return {...state, error: action.payload}

// action.payload.data.user.username

        case actions.LOGIN_USER:
            return state
        case actions.LOGIN_USER_SUCCESS:
            return {...state, user: action.payload}
        case actions.LOGIN_USER_FAILURE:
            return {...state, error: action.payload}
        
        case actions.LOGOUT_USER:
            // console.log(action.type)
            const initUser = {
                username: '',
                email: '',
                password: '',
                role: '',
                company: '',
                profilePhoto: '',
                id: '',
                isAutenticated: false
            }
            return { ...state, user: initUser} ;
        case actions.LOGOUT_USER_SUCCESS:
            return {...state, user: action.payload}
        case actions.LOGOUT_USER_FAILURE:
            return {...state, error: action.payload}

        case actions.UPLOAD_PHOTO:
            return {
                ...state,
                isLoading: true,
            }
        case actions.UPLOAD_PHOTO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                // image: payload
            }
        case actions.UPLOAD_PHOTO_FAILURE:
            return {
                ...state,
                isLoading: false,
                // error: payload,
            }   

        case actions.FETCH_PROFILE_RESPONSE:
            console.log("RESPONSE radi!");
			return { 
                ...state, 
                ...action.payload 
            };

        case action.CREATE_PROFILE:
            console.log('REDUCER CREATE PROFILESSSS')
            return {
                ...state,
                ...action.payload
            }

        
        default: 
        return state;
    }
}

export default reducer;

// MY PROFILE

import React from 'react'
import './MyProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProfileRequest } from '../../redux/action/ActionCreators'


function MyProfile() {

    // const id = useSelector(state => state.reducer.user.id);  
    const id = localStorage.getItem("id"); 
    const object = useSelector((state) => state.data?.data[0]?.attributes); //data?.data[0]?.attributes
    const userId = useSelector((state) => state.data?.data[0]?.id); //data?.data[0]?.attributes

    const [user, setUser] = useState(object);

    // dohvata id osobe koja se loguje
    // console.log(id);

    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => 
    dispatch(fetchProfileRequest(userId)), 1000 )}, [dispatch, userId]);
    console.log(userId, user)

    useEffect(() => {
		setUser(object);
	}, [setUser, object]);  

// UPLOAD PHOTO
    const [ photo, setPhoto ] = useState(null);
    // const [ badFormat, setBadFormat ] = useState(false);
    // const [loading, setLoading] = useState(false);
const handlePhoto = (event) => {
    const uploadPhoto = event.target.files[0];
    console.log("ovde ide upload fotografije", uploadPhoto);

    // const photoType = [ "image/jpeg", "image/png", "image/gif" ];
    //     if (!photoType.some((type) =>
    //     uploadPhoto.type === type)
    //     && uploadPhoto !== null) {
    //         return setBadFormat(true);
    //     }
    // setBadFormat(false);

    const photoData = new FormData();
    photoData.append("files", uploadPhoto);
    setPhoto(photoData)
}

const onSave = (event) => {
    event.preventDefault()
    setPhoto(photo)
    }

  return (
    
    <div className="header-leftbar-right">
       <div className="my-profile">
            <h2 className="title-my-profile">My Profile</h2>

            <div className="container-left-right">

                <div className="left">
                    <div className="header-left">
                        <p className="header-title">Basic Info</p>
                    </div>

{/* NAME */}
                    <div className="left-main">
                        <p className="p-name-profile">
                            Name
                        </p>
                        <input className="input-name" 
                            type="text" 
                            placeholder="Name"
                            value={user !== undefined ? user.name : ""} 
                            onChange={(e) => setUser({ 
                                ...user, 
                                name: e.target.value })}
                        />

{/* PHOTO */}
                        <p className="p-name-profile">
                            Profile Photo
                        </p>
                        <input className="choose-file" 
                            type="file" 
                            placeholder="Upload photo"
                            // value={user?.profilePhoto.data.attributes.name}   ---- ZASTO NECE !?
                            onChange={event => handlePhoto(event)}
                        />
                         {user?.profilePhoto?.data === null || user?.profilePhoto?.data === undefined ? 
                         <p>Korisnik nema sliku</p> : 
                         <img src={user?.profilePhoto.data.attributes.url} 
                            alt={user?.profilePhoto.data.attributes.name} 
                            className="user-img" 
                            width={200} /> } 

                        <div className="but-div">
                            <button className="button">
                                Save
                            </button>
                        </div>    

                    </div>
                </div>

                <div className="right">
                    <div className="header-right">
                        <p className="header-title">Security</p>
                    </div>

{/* EMAIL */}
                    <div className="right-main">
                        <p className="p-name-profile">
                            Email:
                        </p>
                        <p className="email">
                            {user?.user?.data?.attributes.email}
                        {/* {user !== undefined ? "true" : "false"} */}
                        </p>

{/* PASSWORD */}
                        <p className="p-name-profile">
                            Curent Password
                        </p>
                        <input className="input-name" 
                                type="password"  
                                placeholder="Curent password"
                        />
                        <p className="p-name-profile">
                            New Password
                        </p>
                        <input className="input-name" type="password"  placeholder="Enter new password"/>
                        <div className="but-div">
                            <button className="button"
                                // type="submit"
                                onClick={onSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
export default MyProfile;











// REGISTER

import React, { useState, useEffect } from "react";
import './Login.css';
import Header from "./layout/Header";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../redux/action/ActionCreators";
import axios from "axios";

const Register = () => {

    // const newUser = useSelector((state) => state.newUser);
    const user = useSelector((state) => state?.user);
    const userProfile = useSelector((state) => state?.data?.data)

    // const error = useSelector((state) => state.error); 
    // const [ newFile, setNewFile ] = useState("Choose File")

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    const [ photo, setPhoto ] = useState(null);
    const [ role, setRole ] = useState("company_user");
    const [ company, setCompany ] = useState(null);
    // console.log("Ovde smo uneli novu kompaniju");
    // console.log(company);

    const [formIsValid, setFormIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(true);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const statusCode = props.state.registerReducer.response === undefined ? 0 : props.state.registerReducer.response.status;

    
    useEffect(()=> {
        setFormIsValid(
            username.trim().length > 3
            && email.includes('@') 
            && password.trim().length > 5
        );
        // console.log(username, email, password)
        }, [ username, email, password ]);

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

    const [ companies, setCompanies ] = useState(null);

    useEffect(() => {
        axios.get(
            "https://strapi-internship-hr-app.onrender.com/api/companies"
        ).then((response) => {
            console.log("sta nam kaze ova kompanija u RESPONSE?", response)
           setCompanies(response.data.data)
        })
    }, [setCompanies]);

// console.log('proba ispod koda...', companies)

    const [ modal, setModal] = useState(false);

    const toggleModal = (event, modalIsOpen) => {
        // console.log(event);
        event.preventDefault();
        setModal(modalIsOpen)
    }
    // const  [ id, setId ] = useState('');


    // const [ enteredCompanyName, setEnteredCompanyName ] = useState('');
    // const [ enteredSlug, setEnteredSlug ] = useState('');

    // const companyChangeHandler = (event) => {
    //     setEnteredCompanyName(event.target.value);
    // }
    // const slugChangeHandler = (event) => {
    //     setEnteredSlug(event.target.value);
    // }

    // const handleCompany = (event) => {
    //     event.preventDefault();
    
    //     const companyData = {
    //         company: enteredCompanyName,
    //         slug: enteredSlug
    //     }
    //     props.onSaveCompanyData(companyData)
    //     setEnteredCompanyName('');
    //     setEnteredSlug('');
    // }
        
    const [badFormat, setBadFormat] = useState(false);

        // const [loading, setLoading] = useState(false);
    const handlePhoto = (event) => {
        const uploadPhoto = event.target.files[0];
        // console.log(uploadPhoto);

        const photoType = [ "image/jpeg", "image/png", "image/gif" ];
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
            company,
            role
        }))
        // const token = localStorage.getItem("token");





        // navigate("/home");
        setUsername('');
        setEmail('');
        setPassword('');
        setCompany('')
        }
    };

console.log("ovde smo ocitali reg.usera", user)
if (userProfile) {
    return <Navigate to="/home"/>
}

    return (
        <div className="login-form">
            <Header />
            <main>
                <section>
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
                                    onChange={(event) => 
                                    setCompany(event.target.value)}
                                    defaultValue=""
                                >
                                   <option className="light-txt" value="" disabled>
                                        Choose company
                                    </option>
                                        {companies != undefined &&
                                        companies.map(company => {
                                            return (
                                    <option key={company.id} value={company.id}>
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

                            <div className="company-modal" style={{display : modal ? "flex" : "none"}}>
                                <label>Add new company name</label>
                                <input 
                                type="text"
                                placeholder="Enter company name"
                                // value={enteredCompanyName}
                                // onChange={companyChangeHandler}
                                />
                                
                                <label>Add slug</label>
                                <input 
                                type="text"
                                placeholder="Enter slug"
                                // value={enteredSlug}
                                // onChange={slugChangeHandler}
                                />
                                <button className="button button-modal" 
                                // type="submit"
                                onClick={(event) => toggleModal(event, false)}
                                >
                                    Confirm
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
















// APP

import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import CompanyInfo from './components/pages/CompanyInfo';
import Home from './components//pages/Home';
import { Questions } from './components/pages/Questions';
import AddNewQuestions from './components/pages/AddNewQuestions';
import Pending from "./components/pages/Pending";
import Team from "./components/pages/Team";
import PageNotFound from "./components/helpers/PageNotFound";
import ApprovePage from "./components/pages/ApprovePage";
import EditMember from "./components/pages/EditMember";
import EditQuestions from "./components/pages/EditQuestions";
import { QueryClient, QueryClientProvider } from "react-query";
import { Loader } from "./components/helpers/Loader";
import ReturnOnLoginPage from "./components/helpers/ReturnOnLogin";

function App() {

  const [isDone, setIsDone] = useState(false) 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const registerFreshness = useSelector(state => state.reducer.registerFreshness)
  const myUserId = useSelector(state => state.reducer.user.id)
  const isAutenticated = useSelector(state => state.reducer.user.confirmed)

  const token = localStorage.getItem("token");
  console.log(isAutenticated)

  // const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const isLoggedIn = isAutenticated;

  // useEffect(() => {
  //   dispatch({
  //     type: 'AUTO_LOGIN'
  //   })
  // }, [])

  useEffect(() => {
    if(isDone) return;
    const id = parseInt(myUserId)
    if (isAutenticated && id > 0) {
      dispatch({
        type: 'FETCH_PROFILE_REQUEST',
        payload: id
      })
    }
    setIsDone(true)
  }, [isAutenticated, myUserId])

  // useEffect(() => {
  //   if (registerFreshness > 0) {
  //     // redirekcija nakon registracije
  //     navigate('/home');
  //   }
  // }, [registerFreshness])

  const queryClient = new QueryClient(
    // {
    //   defaultOptions: {
    //     queries: {
    //       refetchOnWindowFocus: false,
    //     },
    //   },
    // }
  )




  let loggedInRoutes = null;

  // if (isAutenticated) {
    if(token) {
    console.log("JESAM U LOGOVOANSS")
    loggedInRoutes = (
      <>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/team" element={<Team />} />
        <Route path="/company-info" element={<CompanyInfo />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/addquestions" element={<AddNewQuestions />} />
        <Route path='questions/:questionsId/edit' element={<EditQuestions />} />
        <Route path="/pending-for-approval" element={<Pending />} />
        <Route path="/approve" element={<ApprovePage />} />
        <Route path="/edit" element={<EditMember />} />
        <Route path="*" element={<PageNotFound />} />
      </>
    )
  }

  let loggedOutRoutes = null;

  // if (!isAutenticated) {
    if(!token) {
      const token = localStorage.getItem("token"); // Kad imam token radi posle refessh, bez njega ne mogu da prepoznam

    console.log("NISAM ULOGOVAN")
    loggedOutRoutes = (
      <>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<ReturnOnLoginPage />} /> */}
      </>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>

      <div className="App">
        <Routes>
          {loggedInRoutes}
          {loggedOutRoutes}

          {/* <Route path="*" element={<PageNotFound />} /> */}
          <Route path="ss" element={<Loader />} />

        </Routes>
      </div>

    </QueryClientProvider>
  );
}

export default App;















// TT

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { formatDate } from '../helpers/Date';
import avatar from "../../assets/avatar2.png";
import HeaderLog from '../layout/HeaderLog';
import LeftBar from '../layout/LeftBar';
import './TestTeam.css'
import { useSelector } from 'react-redux';


function TestTim() {




    








    const newProfile = useSelector((state) => state.reducer.profile);
    console.log("---------------------", newProfile)

    const [profile, setProfile] = useState(null);
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        if (newProfile) {
            console.log(newProfile)
            axios.get(
                `https://strapi-internship-hr-app.onrender.com/api/profiles?filters[company][id][$eq]=${newProfile.company.data.id}&populate=*` )
                .then((response) => {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", response)
                setProfiles(response.data.data)
            })
        }
    }, [newProfile]);


    return (
        <>
            <HeaderLog />
            <div className='left-right-container'>
                <LeftBar />
                <div className='right-bar'>
                    {profiles != undefined &&
                        profiles.map(profile => {
                            return (
                                <div className='pending-box'>
                                    <div className='pending-img'>
                                        {!profile?.attributes?.profilePhoto?.data ?
                                            <img className='avatar2'
                                                src={avatar}
                                                alt="User don't have a photo!" /> :
                                            <img src={profile.attributes.profilePhoto.data.attributes.url}
                                                alt={'user photo'}
                                                className="import-pending-photo"
                                                width={200} />}
                                    </div>

                                    <div className='pending-middle'>
                                        <div className='pending-data'>
                                            <div className='pending-name'>
                                                <p>{profile.attributes.name}</p>
                                            </div>
                                            <div className='pending-date'>
                                                Joined {formatDate(profile.attributes.createdAt)}
                                            </div>
                                        </div>
                                        <div className='pending-btn'>
                                            {profile.attributes.status}
                                        </div>
                                    </div>

                                    <div className='pending-buttons'>
                                        <Link to="/approve">
                                            <button className='pending-d-btn'>
                                                Details
                                            </button>
                                        </Link>
                                        <button className='pending-d-btn'>
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default TestTim










// TEAM BOBA
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { formatDate } from '../helpers/Date';
import avatar from "../../assets/avatar2.png";
import HeaderLog from '../layout/HeaderLog';
import LeftBar from '../layout/LeftBar';
import './TestTeam.css'
import { useSelector } from 'react-redux';


function TestTim() {

    const newProfile = useSelector((state) => state.reducer.profile);
    console.log("---------------------", newProfile)


    const [profile, setProfile] = useState(null);
    const [profiles, setProfiles] = useState(null);
    useEffect(() => {
        if (newProfile) {
            axios.get(
                `https://strapi-internship-hr-app.onrender.com/api/profiles?filters[company][id][$eq]=${newProfile.attributes.company.data.id}&populate=*`
            ).then((response) => {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", response)
                setProfiles(response?.data?.data)
            })
        }
    }, [newProfile]);
    return (
        <>
            <HeaderLog />
            <div className='left-right-container'>
                <LeftBar />
                <div className='right-bar'>
                    {profiles != undefined &&
                        profiles.map(profile => {
                            return (
                                <div key={profile.id} className='pending-box'>
                                    <div className='pending-img'>
                                        {!profile?.attributes?.profilePhoto?.data ?
                                            <img className='avatar2'
                                                src={avatar}
                                                alt="User don't have a photo!" /> :
                                            <img src={profile.attributes.profilePhoto.data.attributes.url}
                                                alt={'user photo'}
                                                className="import-pending-photo"
                                                width={200} />}
                                    </div>

                                    <div className='pending-middle'>
                                        <div className='pending-data'>
                                            <div className='pending-name'>
                                                <p>{profile.attributes.name}</p>
                                            </div>
                                            <div className='pending-date'>
                                                Joined {formatDate(profile.attributes.createdAt)}
                                            </div>
                                        </div>
                                        <div className='pending-btn'>
                                            {profile.attributes.status}
                                        </div>
                                    </div>

                                    <div className='pending-buttons'>
                                        <Link to="/approve">
                                            <button className='pending-d-btn'>
                                                Details
                                            </button>
                                        </Link>
                                        <button className='pending-d-btn'>
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default TestTim






