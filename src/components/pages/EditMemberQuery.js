import React from 'react';
import './MyProfile.css';
import HeaderLog from '../layout/HeaderLog';
import LeftBar from '../layout/LeftBar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useProfilDataTeam } from '../../hooks/useProfilData';
import { Loader } from '../helpers/Loader';

export const EditMemberQuery = () => {

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
    const { isLoading, data, isError, error, refetch } = useProfilDataTeam(params.profilId)
    // console.log(params)

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
                            <h2 className="title-my-profile">Edit team member</h2>
                            <div className='right-btns-edit'>
                                <div className='text-and-options'>
                                    <p className="title-questions-little">Status</p>
                                    <select
                                        className="section-options-edit"
                                    >
                                        <option value='Published'>Published</option>
                                        <option value='Pending'>Pending</option>
                                    </select>
                                </div>

                                <button className="edit-member button">
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
                                        value={card?.name}

                                        // value={user !== undefined ? user.name : ""} 
                                        onChange={(e) => setUser({
                                            ...user,
                                            name: e.target.value
                                        })}
                                    />

                                    <p className="p-name-profile">
                                        Profile Photo
                                    </p>
                                    <input className="choose-file"
                                        type="file"
                                        placeholder="Upload photo"
                                        // value={user?.profilePhoto.data.attributes.name}   ---- ZASTO NECE !?
                                        onChange={event => handlePhoto(event)}
                                    />
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
                                        // value={user !== undefined ? user.name : ""} 
                                        onChange={(e) => setUser({
                                            ...user,
                                            name: e.target.value
                                        })}
                                    />
                                </div>

                                {/* <div className='box-1'>
                                <p className='large-txt'>Question 2 - Which city do You live in?</p>
                                <input className="input-txt"
                                    type="text"
                                    placeholder="Answer"
                                // value={user !== undefined ? user.name : ""} 
                                // onChange={(e) => setUser({ 
                                //         ...user, 
                                //         name: e.target.value })}
                                />
                            </div> */}

                                <div className='box-1'>
                                    <p className='large-txt'>Question 3 - Take a photo of Your X-mass</p>
                                    <p className="p-name-profile">
                                        Profile Photo
                                    </p>
                                    <input className="choose-file"
                                        type="file"
                                        placeholder="Upload photo"
                                    // value={user?.profilePhoto.data.attributes.name}   ---- ZASTO NECE !?
                                    // onChange={event => handlePhoto(event)}
                                    />
                                    {/* {user?.profilePhoto?.data === null || user?.profilePhoto?.data === undefined ? 
                                <p>Korisnik nema sliku</p> : 
                                <img src={user?.profilePhoto.data.attributes.url} 
                                alt={user?.profilePhoto.data.attributes.name} 
                                className="user-img" 
                                width={200} /> } */}
                                </div>

                                <div className='box-2'>
                                    <button className="button"
                                        type="submit"
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




