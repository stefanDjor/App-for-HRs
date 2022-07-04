import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import CompanyInfo from './components/pages/CompanyInfo';
import Home from './components//pages/Home';
import { Questions } from './components/pages/Questions';
import AddNewQuestions from './components/pages/AddNewQuestions';
// import Pending from "./components/pages/Pending";
import Team from "./components/pages/Team";
// import ProtectedRoute from "./components/helpers/ProtectedRoute";
import PageNotFound from "./components/helpers/PageNotFound";
import ApprovePage from "./components/pages/ApprovePage";
import EditMember from "./components/pages/EditMember";
import EditQuestions from "./components/pages/EditQuestions";
import { QueryClient, QueryClientProvider } from "react-query";
import { Loader } from "./components/helpers/Loader";
// import ReturnOnLoginPage from "./components/helpers/ReturnOnLogin";
import PendingForApproval from "./components/pages/PendingForApproval";
// import MobileMenu from "./components/layout/MobileMenu";
import { ReactQueryDevtools } from 'react-query/devtools' 
import { PendingQuery } from "./components/pages/Pending-Query";
import { TeamQuery } from "./components/pages/Team-Query";
import { AproveQuery } from "./components/pages/Aprove-Query";
import { EditMemberQuery } from "./components/pages/EditMemberQuery";


function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const registerFreshness = useSelector(state => state.reducer.registerFreshness)
  const myUserId = useSelector(state => { 
    // console.log(state)
   return state.reducer.user.id})

  // const isAutenticated = useSelector(state => state.reducer.user.confirmed)
  const isAutenticated = useSelector(state => state.reducer.profile)

  // const token = localStorage.getItem("token");


  // console.log(isAutenticated)

  // const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const isLoggedIn = isAutenticated;

  useEffect(() => {
    dispatch({
      type: 'AUTO_LOGIN'
    })
  }, [])

  // useEffect(() => {
  //   const id = parseInt(myUserId)
  //   if (isAutenticated && id > 0) {
  //     dispatch({
  //       type: 'FETCH_PROFILE_REQUEST',
  //       payload: id
  //     })
  //   }
  // }, [isAutenticated, myUserId])

  useEffect(() => {
    if (registerFreshness > 0) {
      // redirekcija nakon registracije
      navigate('/home');
    }
  }, [registerFreshness])

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

  if (isAutenticated) {
    loggedInRoutes = (
      <>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/team" element={<Team />} />
        <Route path="/company-info" element={<CompanyInfo />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/addquestions" element={<AddNewQuestions />} />
        <Route path="questions/:questionsId/edit" element={<EditQuestions />} />
        <Route path="/pending-for-approval" element={<PendingForApproval />} />
        {/* <Route path="/approve" element={<ApprovePage />} /> */}
        <Route path="/pending-for-approval/:profileId/approve" element={<ApprovePage />} />
        <Route path="/edit" element={<EditMember />} />
        <Route path="*" element={<PageNotFound />} />
        {/* <Route path="/menu" element={<MobileMenu />} /> */}



        <Route path="/pending-query" element={<PendingQuery />} />
        <Route path="/team-query" element={<TeamQuery />} />
        <Route path="/pending-query/:profilId" element={<AproveQuery />} />
        <Route path="/team-query/:profilId" element={<EditMemberQuery />} />

        
      </>
    )
  }

  let loggedOutRoutes = null;

  if (!isAutenticated) {
    loggedOutRoutes = (
      <>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<ReturnOnLoginPage />} /> */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
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
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  );
}

export default App;
