import React from 'react'
import './Leftbar.css';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import { fetchProfileRequest } from '../../redux/action/ActionCreators';
import avatar from "../../assets/avatar.png";



function LeftBar() {


  // const id = localStorage.getItem("id");
  const newUser = useSelector((state) => state.user); //copy iz MyProfile

  const newProfile = useSelector((state) => state.reducer.profile);

  const profile = {
    profilePhoto: '',
    name: ''
  }
  const [user, setUser] = useState(profile);

  const dispatch = useDispatch();
  useEffect(() => {
    if(newUser?.id) {
      // dispatch(fetchProfileRequest(newUser.id))
    }
  }, [newUser]);

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
    // console.log("ovde ide upload fotografije", uploadPhoto);

    const photoData = new FormData();
    photoData.append("files", uploadPhoto);
    setPhoto(photoData)
  }


  // const onSave = (event) => {
  //     event.preventDefault()
  //     setPhoto(photo)
  // }

  return (
    <div className='response-none'>
      <div className="container-leftbar">
        <h2 className="lb-title">Menu</h2>
        {/* <Link to="/pending-for-approval" className="lb-links"> &#8827; Pending for approval</Link> */}
        {/* <Link to="/team" className="lb-links"> &#8827; Team</Link> */}
        <Link to="/pending-query" className="lb-links"> &#8827; Pending for approval</Link>
        <Link to="/team-query" className="lb-links"> &#8827; Team</Link>
        <Link to="/questions" className="lb-links"> &#8827; Questions</Link>
        <Link to="/company-info" className="lb-links"> &#8827; Company Info</Link>
        <Link to="/home" className="lb-links"> &#8827; My Profile</Link>
        

        <div className='user-data'>
          <div className='user-photo'>
            {/* {user?.profilePhoto?.data === null || user?.profilePhoto?.data === undefined ? */}
            {user.profilePhoto === null || user.profilePhoto === undefined ?
              <img className='avatar'
                src={avatar}
                alt="User don't have a photo!" /> :
              // <img src={user?.profilePhoto.data.attributes.url}
              <img src={user.profilePhoto}
                // alt={user?.profilePhoto.data.attributes.name}
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

export default LeftBar
