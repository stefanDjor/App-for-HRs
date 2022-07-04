import initState from "./InitState";
import * as actions from "../action/ActionsTypes";

function reducer(state = initState, action) {
    switch (action.type) {


        case actions.REGISTER_USER:
            return state;
        case actions.REGISTER_USER_SUCCESS:
            return { ...state, 
                user: action.payload 
            }
        case actions.REGISTER_USER_FAILURE:
            return { ...state, 
                error: action.payload 
            }



        case actions.AFTER_REGISTER_SUCCESS:
            return { ...state, 
                registerFreshness: state.registerFreshness + 1 
            }



        case actions.LOGIN_USER:
            return {...state}
        case actions.LOGIN_USER_SUCCESS:
            return { ...state, 
                user: action.payload 
            }
        case actions.LOGIN_USER_FAILURE:
            return { ...state, 
                error: action.payload 
            }



        case actions.LOGOUT_USER_SUCCESS:
            return { ...state, 
                user: action.payload 
            }
        case actions.LOGOUT_USER_FAILURE:
            return { ...state, 
                error: action.payload 
            }




        case actions.UPLOAD_PHOTO:
            return {
                ...state,
                isLoading: true,
            }
        case actions.UPLOAD_PHOTO_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case actions.UPLOAD_PHOTO_FAILURE:
            return {
                ...state,
                isLoading: false,
            }

        case actions.SET_INITIAL_LOADING:
            return { ...state, 
                loading: action.value 
            };


        case actions.FETCH_PROFILE_RESPONSE:
            // console.log("RESPONSE radi!");
            // console.log(action)
            return {
                ...state,
                profile: {
                    ...action.payload
                }
            };

        case action.CREATE_PROFILE:
            return {
                ...state,
                ...action.payload
            }

        case actions.FETCH_COMPANY_SUCCESS_BY_USER_ID:
            return {
                ...state,
                userCompany: {
                    ...action.payload
                }
            };


        default:
            return state;
    }
}

export default reducer;