import * as ActionTypes from "./ActionsTypes"


// REGISTER
export const registerUser = (user) => {
    console.log(user)
    return {
        type: ActionTypes.REGISTER_USER,
        payload: user
    }
}
export const registerUserSuccess = (user) => {
    return {
        type: ActionTypes.REGISTER_USER_SUCCESS,
        payload: user
    }
}
export const registerUserFailure = (user) => {
    return {
        type: ActionTypes.REGISTER_USER_FAILURE,
        payload: user
    }
}


// LOGIN
export const loginUser = (payload) => {
    return {
        type: ActionTypes.LOGIN_USER,
        payload
    }
}
export const loginUserSuccess = (payload) => {
    return {
        type: ActionTypes.LOGIN_USER_SUCCESS,
        payload
    }
}
export const loginUserFailure = (payload) => {
    return {
        type: ActionTypes.LOGIN_USER_FAILURE,
        payload
    }
}


// LOGOUT
export const logoutUser = () => {
    return {
        type: ActionTypes.LOGOUT_USER,
    }
}
export const logoutUserSuccess = () => {
    return {
        type: ActionTypes.LOGOUT_USER_SUCCESS,
    }
}
export const logoutUserFailure = () => {
    return {
        type: ActionTypes.LOGOUT_USER_FAILURE,
    }
}




// CREATE PROFILE
export const createProfile = (payload) => {
    return {
        type: ActionTypes.CREATE_PROFILE,
        payload
    }
}
export const createProfileSuccess = (payload) => {
    return {
        type: ActionTypes.CREATE_PROFILE_SUCCESS,
        payload
    }
}
export const createProfileFailure = (payload) => {
    return {
        type: ActionTypes.CREATE_PROFILE_FAILURE,
        payload
    }
}



export const fetchProfileRequest = (id = null) => {
    // console.log("Usao sam u AKCIJU!!!");
    // console.log(id)
    return {
        id,
        type: ActionTypes.FETCH_PROFILE_REQUEST,
    };
};

export const fetchProfileResponse = (user) => {
    // console.log(user)
    // console.log("Izlazim iz AKCIJE!")
    return {
        type: ActionTypes.FETCH_PROFILE_RESPONSE,
        payload: user,
    };
};




// 
export const fetchProfileByIdRequest = (user) => {
    return {
        type: ActionTypes.FETCH_PROFILE_RESPONSE,
        payload: user,
    };
};

export const fetchProfileByIdResponse = (user) => {
    return {
        type: ActionTypes.FETCH_PROFILE_RESPONSE,
        payload: user,
    };
};






// LOADER 
export const setInitalLoading = (value) => {
    return {
        type: ActionTypes.SET_INITIAL_LOADING,
        value,
    };
};



// CREATE COMPANY
export const createCompany = (payload) => {
    return {
        type: ActionTypes.CREATE_COMPANY,
        payload
    }
}
export const createCompanySuccess = (payload) => {
    return {
        type: ActionTypes.CREATE_COMPANY_SUCCESS,
        payload
    }
}
export const createCompanyFailure = (payload) => {
    return {
        type: ActionTypes.CREATE_COMPANY_FAILURE,
        payload
    }
}


// FETCH COMPANY
export const fetchCompany = () => {
    return {
        type: ActionTypes.FETCH_COMPANY,
    }
}
export const fetchCompanySuccess = (payload) => {
    return {
        type: ActionTypes.FETCH_COMPANY_SUCCESS,
        payload
    }
}
export const fetchCompanyFailure = (payload) => {
    return {
        type: ActionTypes.FETCH_COMPANY_FAILURE,
        payload
    }
}




// FETCH COMPANY BY ID
export const fetchCompanyById = (payload) => {
    return {
        type: ActionTypes.FETCH_COMPANY_BY_USER_ID,
        payload
    }
}
export const fetchCompanyByIdSuccess = (payload) => {
    return {
        type: ActionTypes.FETCH_COMPANY_SUCCESS_BY_USER_ID,
        payload
    }
}
export const fetchCompanyByIdFailure = (payload) => {
    return {
        type: ActionTypes.FETCH_COMPANY_FAILURE_BY_USER_ID,
        payload
    }
}



// PHOTO
export const uploadPhoto = (payload) => {
    return {
        type: ActionTypes.UPLOAD_PHOTO,
        payload
    }
}
export const uploadPhotoSuccess = (payload) => {
    return {
        type: ActionTypes.UPLOAD_PHOTO_SUCCESS,
        payload
    }
}
export const uploadPhotoFailure = (payload) => {
    return {
        type: ActionTypes.UPLOAD_PHOTO_SUCCESS,
        payload
    }
}



// CLEAR STORE

export const clearStore = () => {
    return {
        type: ActionTypes.CLEAR_STORE,

    }
}


