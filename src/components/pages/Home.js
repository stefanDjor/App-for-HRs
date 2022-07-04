import React, { useEffect } from 'react';
import MyProfile from '../pages/MyProfile';
import LeftBar from '../layout/LeftBar';
import '../pages/Home.css';
import HeaderLog from '../layout/HeaderLog';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProfileRequest, setInitalLoading } from '../../redux/action/ActionCreators';
import { Loader } from '../helpers/Loader';

function Home() {

  const id = localStorage.getItem("id");
  let isLoadedPage = useSelector(state => state.reducer.loading);

  const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(setInitalLoading(true));

  //       // prebaciti LOADER u home page
        // if(id) {
          // dispatch(fetchProfileRequest(id))
        // }
    }, [])

  


  return (
    <>
    {isLoadedPage ? <Loader /> : (
    <div className='width-max'>
      <HeaderLog />
      <div className="container-home">
        <LeftBar />
        <div className="company-info">
          <MyProfile />
        </div>
      </div>
    </div>
    )}
    </>
  )
}

export default Home
