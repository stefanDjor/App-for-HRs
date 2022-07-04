import axios from "axios";


axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        // console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
    }
);


// LOGIN
export const login = async (payload) => {
    console.log(payload)
    try {
        const response = await axios({
            method: "POST",
            url: "https://strapi-internship-hr-app.onrender.com/api/auth/local",
            data: {
                "identifier": payload.email,
                "password": payload.password
            }
        });
        return response.data

    } catch (error) {
        // console.log(error)
    }
}


// REGISTER
export const register = async (payload) => {
    console.log(payload)
    try {
        const response = await axios({
            method: "POST",
            url: "https://strapi-internship-hr-app.onrender.com/api/auth/local/register",
            data: {
                "username": payload.username,
                "email": payload.email,
                "password": payload.password,
            }
        })
        /*
          if (response.data.jwt) {
            const token = response.data.jwt
            localStorage.setItem("token", token) 
          }
          */
        return response.data

    } catch (error) {
        // console.log(error)
    }
}



// export const logout = async(payload) => {
//     try {
//         const response = await axios({
//                 method: "POST",
//                 url: "https://strapi-internship-hr-app.onrender.com/api/auth/local/home",
//                 data: {
//                     // "username": payload.username,
//                     // "email": payload.email,
//                     // "password": payload.password,
//                 }
//             })
//               if (response.data.jwt) {
//                 const token = response.data.jwt
//                 localStorage.removeItem("token", token) 
//               }
//         return response.data

//     } catch(error) {
//         console.log(error)
//     }

// }



// UPLOAD PHOTO
export const uploadPhoto = async (image) => {
    try {
        // console.log(image)
        const response = await axios({
            method: "POST",
            url: "https://strapi-internship-hr-app.onrender.com/api/upload",
            data: image,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return { payload: response.data }
    } catch (error) {
        // console.log(error)
    }
}



// CREATE PROFILE
export const createProfile = async (payload) => {
    try {
        // console.log("USLI SMO U CREATE NEW PROFILE", payload);
        const response = await axios(
            {
                method: "POST",
                url: "https://strapi-internship-hr-app.onrender.com/api/profiles",
                data: {
                    data: payload
                }
            }
        )
        // const response = await axios.post("https://strapi-internship-hr-app.onrender.com/api/profiles", {data: payload});
        // console.log(response)
        return response.data
    } catch (error) {
        // console.log("ERRORRR createNewProfile")
        // console.log(error)
        return error;
    }
}



// FETCH PROFILE
export const fetchProfile = async (id) => {
    try {
        if(!id) {
            return
        }
        return axios(
            {
                method: 'GET',
                url: `https://strapi-internship-hr-app.onrender.com/api/profiles?filters[user][id][$eq]=${id}&populate=*&pagination[pageSize]=1000`                
            }
        )
    } catch (error) {
        return error;
    }
};


export const fetchProfileById = async (profileId) => {
    try {
        if(!profileId) {
            return
        }
        return axios(
            {
                method: 'GET',
                url: `https://strapi-internship-hr-app.onrender.com/api/profiles?filters[profile][id][$eq]=${profileId}&populate=*&pagination[pageSize]=1000`
            }
        )
    } catch (error) {
        return error;
    }
};



// CREATE COMPANY
export const createNewCompany = async (payload) => {
    try {
        // console.log(payload);
        const response = await axios.post('https://strapi-internship-hr-app.onrender.com/api/companies', {
            data:payload
        })
        // console.log(response);
        return {payload: response.data };
    }
    catch (error) {
        // console.log(error);
        return error;
    }
}


// FETCH COMPANY
export const fetchCompanyByProfileId = async (profileId) => {
    try {
        if(!profileId) {
            return
        }
        return axios(
            {
                method: 'GET',
                url: `https://strapi-internship-hr-app.onrender.com/api/companies?filters[profiles][id][$eq]=${profileId}&populate=*`
            }
        )
    } catch (error) {
        return error;
    }
};