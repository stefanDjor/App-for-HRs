import React from 'react';
import './MyProfile.css';
import HeaderLog from '../layout/HeaderLog';
import LeftBar from '../layout/LeftBar'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useProfilData } from '../../hooks/useProfilData';
import { Loader } from '../helpers/Loader';


export const AproveQuery = () => {

    const [user, setUser] = useState(null);

    const [photo, setPhoto] = useState(null);
    const handlePhoto = (event) => {
        const uploadPhoto = event.target.files[0];
        const photoData = new FormData();
        photoData.append("files", uploadPhoto);
        setPhoto(photoData)
    }

    const onSave = (event) => {
        event.preventDefault()
        setPhoto(photo)
    }


    const params = useParams()
    const { isLoading, data, isError, error, refetch } = useProfilData(params.profilId)
    // console.log(data.data.data.attributes)
    const card = data?.data?.data?.attributes
    const profileImg = card?.profilePhoto?.data?.attributes?.url

    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }


    return (
        <div>
            <div className="header-leftbar-right">
                <HeaderLog />
                <div className="questions-container">
                    <LeftBar />
                    <div className="approve-right-side">
                        <div className="title-and-btns">
                            <h2 className="title-my-profile">Moderate team member entry</h2>
                            <div className='right-btns'>
                                <Link to="/team-query">
                                    <button className="add-questions button">
                                        Approve
                                    </button>
                                </Link>
                                <button className="add-questions button">
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="container-left-right">

                            <div className="left">
                                <div className="header-left">
                                    <p className="header-title">Basic Info</p>
                                </div>

                                <div className="left-main">
                                    <p className="p-name-profile">
                                        Name
                                    </p>
                                    <input className="input-name"
                                        type="text"
                                        placeholder="Name"
                                        // value={user !== undefined ? user?.name : ""}
                                        value={card?.name}

                                        onChange={(event) => setUser({
                                            ...user,
                                            name: event.target.value
                                        })}
                                    />

                                    <p className="p-name-profile">
                                        Profile Photo
                                    </p>
                                    <input className="choose-file"
                                        type="file"
                                        placeholder="Upload photo"
                                        onChange={event => handlePhoto(event)}
                                    />
                                    {/* {/* {user?.profilePhoto === null || user?.profilePhoto === undefined ?
                                    <p className='no-img-txt'>User don't have a photo!</p> :
                                     <img src={user?.profilePhoto} */}

                                    {<img src={profileImg}

                                        alt={'user photo'}
                                        className="user-img"
                                        width={200} />}

                                    <div className="but-div">
                                        <button className="button">
                                            Save
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <div className="right">
                                <div className="header-right">
                                    <p className="header-title">Answers</p>
                                </div>

                                <div className='box-1'>
                                    <p className='large-txt'>Question 1 - Do You have a pet?</p>
                                    <input className="input-txt"
                                        type="text"
                                        placeholder="Answer"
                                    />
                                </div>

                                <div className='box-1'>
                                    <p className='large-txt'>Question 2 - Which city do You live in?</p>
                                    <input className="input-txt"
                                        type="text"
                                        placeholder="Answer"
                                    />
                                </div>

                                <div className='box-1'>
                                    <p className='large-txt'>Question 3 - Take a photo of Your X-mass</p>
                                    <p className="p-name-profile">
                                        Profile Photo
                                    </p>
                                    <input className="choose-file"
                                        type="file"
                                        placeholder="Upload photo"
                                    />
                                </div>

                                <div className='box-2'>
                                    <button className="button"
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
        </div>

    )
}

