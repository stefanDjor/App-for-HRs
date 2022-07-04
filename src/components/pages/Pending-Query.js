import axios from 'axios';
import { Link } from 'react-router-dom';
import HeaderLog from '../layout/HeaderLog';
import LeftBar from '../layout/LeftBar';
import './Pending'
import { Loader } from '../helpers/Loader';
import { useQuery } from "react-query";
import PageNotFound from '../helpers/PageNotFound';
import { useSelector } from 'react-redux';
import avatar from "../../assets/avatar2.png";
import { formatDate } from '../helpers/Date';


export const PendingQuery = () => {

    const companyId = useSelector((state) => state.reducer.profile.attributes?.company?.data.id)
    localStorage.setItem('companyId', companyId)
    // console.log(companyId)

    const fetchPostmanProfiles = (companyId) => {
        return axios
            .get(`https://strapi-internship-hr-app.onrender.com/api/profiles?filters[status][$eq]=pending&filters[company][id][$eq]=${companyId}&sort=createdAt&populate=*`)
    }

    const {
        isLoading,
        data: profiles,
        isError,
        error,
        isFetching, refetch } = useQuery(
            ['profiles', 
            companyId], 
            () => fetchPostmanProfiles(companyId), 
            { refetchOnWindowFocus: true }
            )
    // console.log({isLoading, isFetching})

    if (isLoading) {
        return <Loader />
    }
    if (error) {
        return <div>
            <PageNotFound />
        </div>
    }


    return (
        <div>
            <div className="header-leftbar-right">
                <HeaderLog />
                <div className="left-bar-companyinfo">
                    <LeftBar />
                    <div className="container-company-info">
                        <h2 className="company-title">Pending for approval</h2>
                        <div className='right-bar'>
                            {
                                profiles?.data?.data?.map((profile, index) => {
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

                                                <Link to={`/pending-query/${profile.id}`}>
                                                    <button id={profile.id} className='pending-d-btn'>
                                                        Details
                                                    </button>
                                                </Link>



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

        </div>
    )
}
