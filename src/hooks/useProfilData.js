import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";

// const companyId = useSelector((state) => state.reducer.profile.attributes?.company?.data.id)
const companyId = localStorage.getItem('companyId')

const fetchPostmanProfiles = (profileId) => {    
    return axios.get(`https://strapi-internship-hr-app.onrender.com/api/profiles/${profileId}/?filters[status][$eq]=pending&filters[company][id][$eq]=${companyId}&sort=createdAt&populate=*`)
}

export const useProfilData = (profileId) => {
    return useQuery(['profiles', profileId], () => fetchPostmanProfiles(profileId))
}





const fetchPostmanProfilesTeam = (profileId) => {    
    return axios.get(`https://strapi-internship-hr-app.onrender.com/api/profiles/${profileId}/?filters[status][$eq]=published&filters[company][id][$eq]=${companyId}&sort=createdAt&populate=*`)
}

export const useProfilDataTeam = (profileId) => {
    return useQuery(['profiles', profileId], () => fetchPostmanProfilesTeam(profileId))
}