import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyById, fetchProfileRequest, setInitalLoading } from '../../redux/action/ActionCreators';
import HeaderLog from '../layout/HeaderLog';
import LeftBar from '../layout/LeftBar'
import './CompanyInfo.css';
import { Loader } from '../helpers/Loader';
import { type } from '@testing-library/user-event/dist/type';


function CompanyInfo() {



  // UPLOAD NEW PHOTO
  const [newPhoto, setNewPhoto] = useState(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState(null);
  const [username, setUsername] = useState('')

  const handlePhoto = (event) => {
    const uploadPhoto = event.target.files[0];
    // console.log("ovde ide upload fotografije", uploadPhoto);
    setNewPhotoUrl(URL.createObjectURL(uploadPhoto))

    const photoData = new FormData();
    photoData.append("files", uploadPhoto);
    setNewPhoto(photoData)
  }


  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };



  const id = localStorage.getItem("id");
  // const newUser = useSelector((state) => state.user);
  const newProfile = useSelector((state) => state.reducer.profile);
  let isLoadedPage = useSelector(state => state.reducer.loading);
  const userCompany = useSelector(state => state.reducer.userCompany)

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitalLoading(true));

    // if (id) {
      // dispatch(fetchProfileRequest(id))
      dispatch(fetchCompanyById({ id: newProfile.id }))
    // }
  }, []);


  useEffect(() => {
    const profile = {
      company: newProfile?.attributes?.company?.data?.attributes?.name
    }
    setUser(profile);
  }, [setUser, newProfile]);



  // SAVE BUTTON
  const onSave = (event) => {
    // let type
    let payload = newPhoto
    event.preventDefault()
    dispatch({
      type: type,
      payload
      // newPhoto
    })
    // return
  };


  return (
    <>
      {isLoadedPage ? <Loader /> : (

        <div className="header-leftbar-right">
          <HeaderLog />
          <div className="left-bar-companyinfo">
            <LeftBar />
            <div className="container-company-info-page">
              <h2 className="company-title">Company Info</h2>
              <p className="company-name">Company Name</p>
              <input className='choose-company-file'
                type="text"
                value={user !== undefined ? user?.company : ""}
                onChange={event => usernameChangeHandler(username)}
              />
              <p className="company-name">Company Logo</p>
              <input className='choose-file'
                type="file"
                name="file"
                // placeholder="Upload photo"
                onChange={event => handlePhoto(event)}
              />
              <div className="div-but">
                <button className="button"
                  onClick={onSave}
                >
                  Save
                </button>
              </div>
              {/* {console.log({newPhoto})} */}
              {/* {console.log({userCompany})} */}

              {
                newPhoto ? <img className='img-preview' src={newPhotoUrl} alt="Company logo" /> : <img className='img-preview' src={userCompany?.attributes?.logo?.data?.attributes?.url} alt="Company logo" />
              }
              {/* <p className='logo-txt'>No logo!</p> */}
              {/* {newPhotoUrl && <img className='img-preview' src={newPhotoUrl} alt="new photo"/>}
              {userCompany.attributes?.logo?.data?.attributes?.url && <img className='img-preview' src={userCompany.attributes.logo.data.attributes.url} alt="new photo"/>} */}

            </div>
          </div>
        </div>

      )}
    </>
  )
}

export default CompanyInfo






