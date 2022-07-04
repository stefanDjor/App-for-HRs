import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { formatDate } from '../helpers/Date';
import avatar from "../../assets/avatar2.png";
import HeaderLog from '../layout/HeaderLog';
import LeftBar from '../layout/LeftBar';
import './Pending.css';
import './CompanyInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileRequest, setInitalLoading } from '../../redux/action/ActionCreators';
import { Loader } from '../helpers/Loader';


function PendingForApproval() {


    const id = localStorage.getItem("id");
    // const newUser = useSelector((state) => state.user);
    const newProfile = useSelector((state) => state.reducer.profile);
    let isLoadedPage = useSelector(state => state.reducer.loading);
    // console.log("---------------------", newProfile)


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setInitalLoading(true));

        // if (id) {
        //     dispatch(fetchProfileRequest(id))
        // }
    }, []);

    let index;
    const [profile, setProfile] = useState(null);
    const [profiles, setProfiles] = useState(null);
    useEffect(() => {

        if (newProfile) {
            axios.get(
                `https://strapi-internship-hr-app.onrender.com/api/profiles?filters[company][id][$eq]=${newProfile.attributes?.company.data?.id}&populate=*&filters[status][$eq]=pending`
            ).then((response) => {
                setProfiles(response?.data?.data)
                dispatch(setInitalLoading(false));
            })
        }
    }, [newProfile]);



    return (

        <>
            {isLoadedPage && <Loader /> ? <Loader /> : (

                <div className="header-leftbar-right">
                    <HeaderLog />
                    <div className="left-bar-companyinfo">
                        <LeftBar />
                        <div className="container-company-info">

                            <h2 className="company-title">Pending for approval</h2>
                            <div className='right-bar'>

                                {profiles != undefined &&
                                    profiles.map((profile, index) => {
                                        return (
                                            <div key={index} className='pending-box'>
                                                <div className='two-of-three'>
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
                                                    {/* <Link to={`/approve/${profile.id}`}> */}
                                                    <Link to={`/pending-for-approval/${profile.id}/approve`}>
                                                        <button id={profile.id} className='pending-d-btn'>
                                                            Details
                                                        </button>
                                                    </Link>

                                                    {/* <Link to={`/pending-for-approval/${profile.id}/approve`}>
                                                        <button className="pending-d-btn">
                                                            Edit
                                                        </button>
                                                    </Link> */}






                                                    <button id={profile.id} className='pending-d-btn'>
                                                        Delete
                                                    </button>
                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PendingForApproval