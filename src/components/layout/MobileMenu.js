import React from 'react'
import './Leftbar.css';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import avatar from "../../assets/avatar.png";



function MobileMenu() {

    const newUser = useSelector((state) => state.user);
    const newProfile = useSelector((state) => state.reducer.profile);

    const profile = {
        profilePhoto: '',
        name: ''
    }
    const [user, setUser] = useState(profile);

    // const dispatch = useDispatch();
    // useEffect(() => {
    // }, [newUser]);

    useEffect(() => {
        const profile = {
            profilePhoto: newProfile?.attributes?.profilePhoto?.data?.attributes?.url,
            name: newProfile?.attributes?.name
        }
        setUser(profile);
    }, [setUser, newProfile]);


    const [photo, setPhoto] = useState(null);
    const handlePhoto = (event) => {
        const uploadPhoto = event.target.files[0];

        const photoData = new FormData();
        photoData.append("files", uploadPhoto);
        setPhoto(photoData)
    }

    const [modal, setModal] = useState(false);

    const toggleModal = (event, modalIsOpen) => {
        event.preventDefault();
        setModal(modalIsOpen)
    }

    return (
        <div className='response-full'>
            <div className="container-leftbar">
                <div className='x-modal-mob'
                    onClick={(event) => {
                        toggleModal(event, true)
                    }}
                >
                    X
                </div>
                <h2 className="lb-title">Menu</h2>
                <div className='thunk'>
                    <Link to="/pending-for-approval" className="lb-links"> &#8827; Pending for approval</Link>
                    <Link to="/team" className="lb-links"> &#8827; Team</Link>
                    <Link to="/questions" className="lb-links"> &#8827; Questions</Link>
                    <Link to="/company-info" className="lb-links"> &#8827; Company Info</Link>
                    <Link to="/home" className="lb-links"> &#8827; My Profile</Link>
                </div>
                <div className='user-data'>
                    <div className='user-photo'>
                        {user.profilePhoto === null || user.profilePhoto === undefined ?
                            <img className='avatar'
                                src={avatar}
                                alt="User don't have a photo!" /> :
                            <img src={user.profilePhoto}
                                alt={'user photo'}
                                className="import-img-lb"
                                width={200} />}
                    </div>
                    <div className='user-name'>
                        {user.name === null || user.name === undefined ?
                            <p className='no-img-txt'>Unknown user</p> :
                            <p>{user.name}</p>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MobileMenu
