import { takeEvery, call, put, takeLatest, select } from "redux-saga/effects";
import { fetchProfileResponse, setInitalLoading, fetchCompanyByIdSuccess, fetchCompanyByIdFailure, fetchCompanyById } from "../redux/action/ActionCreators";
import * as ActionsTypes from "../redux/action/ActionsTypes";
import * as authApi from "../services/api/authApi";



// REGISTER
export function* register(action) {

    const {
        username,
        email,
        password,
        photo,
        newCompany,
        role
    } = action.payload
    try {
        const response = yield call(
            authApi.register, {
            username,
            email,
            password
        });

        // console.log('register saga response', response)

        if (response) {
            let id = response.user.id;
            let companyId = newCompany;
            localStorage.setItem("id", id);
            localStorage.setItem('token', response.jwt)


            if (id) {
                yield call(fetchProfileSaga, id)
            }

            if (isNaN(newCompany)) {
                const slug = newCompany.toLowerCase().replaceAll(' ', '-')
                const responseCompany = yield call(authApi.createNewCompany, { name: newCompany, slug: slug })
                // console.log(responseCompany)
                companyId = responseCompany.payload.data.id
                yield put({ type: ActionsTypes.CREATE_COMPANY, response: responseCompany })
            }

            let photoId = null;
            if (photo != null) {
                const img = yield call(authApi.uploadPhoto, photo);
                // console.log(img)
                photoId = img.payload[0].id;
                // console.log(photoId)
            }
            // console.log(response.user)

            yield put(
                {
                    type: ActionsTypes.REGISTER_USER_SUCCESS,
                    payload: response.user
                }
            )

            const profileResponse = yield call(authApi.createProfile, {
                name: username,
                user: response.user.id,
                userRole: role,
                company: Number(companyId),
                profilePhoto: photoId,
            })
            yield put({
                type: ActionsTypes.FETCH_PROFILE_RESPONSE,
                payload: profileResponse.data
            })
        }


        // pokrenuti loading... (koristiti PUT)
        // call ka backendu gde se salju podaci (call , )
        // sacuvati token i userId u localStorage (ako je bezuspesno, error)
        // kreirati company i uploadovati img (ukoliko podaci postoje)
        // ako imamo i usera i company i img onda se kreira profil (yield call)
        // prekinuti loading... (koristiti PUT)
        // redirekcija korisnika (uz pomoc react routera)


    } catch (error) {
        yield put({
            type: ActionsTypes.REGISTER_USER_FAILURE,
            payload: { message: "Check Your data!" }
        })
    }
};




// LOGIN
export function* login(action) {
    // console.log(action)
    const {
        email,
        password
    } = action.payload
    try {
        const response = yield call(
            authApi.login, {
            email,
            password
        }
        )

        if (response) {
            let token = response.jwt != null ? response.jwt : null;
            // console.log(response)
            let id = response.user.id;
            localStorage.setItem("id", id);
            localStorage.setItem('token', response.jwt)
            if (token) {
                yield call(fetchProfileSaga, id)
                const profileId = yield select(store => store?.reducer?.profile?.id)
                yield put(fetchCompanyById(profileId))
            }
        }
    } catch (error) {
        console.log(error)
        yield put({
            type: ActionsTypes.LOGIN_USER_FAILURE,
            payload: { message: "Check Your email and password!" }
        })
    }
}



// FETCH PROFILE
export function* fetchProfileSaga(id) {
    try {
        // console.log("Usao sam u SAGU i prosledio id");
        // console.log(id);
        const { data } = yield call(
            authApi.fetchProfile,
            id
        )
        // console.log('saga fetch my profile action', action) // PAZNJA -> action nema payload nego id
        // console.log('saga fetch my profile response', data)
        // if (response && response.data && response.data.data && response.data.data[0]) {
        const payload = data?.data?.[0];
        yield put(setInitalLoading(false));
        yield put(fetchProfileResponse(payload));
        // }
    } catch (error) {
        return error
    }
}




// FETCH COMPANY
export function* fetchSagaCompanyByProfileId(action) {
    try {
        const response = yield call(
            authApi.fetchCompanyByProfileId,
            action.payload.id
        )
        // console.log({response})
        yield put(setInitalLoading(false));

        yield put(fetchCompanyByIdSuccess(response?.data?.data?.[0]))
    } catch (error) {
        yield put(fetchCompanyByIdFailure(error.message))
        return error
    }
}

//  za izmenu uploada slike napraviti action EditCompany, napraviti sagu koja dohvata akciju editCompany, koja ce dalje da pozove sliku (tj. upload slike) i nakon toga PUT(api/companyId)koji cemo pronaci na Postmanu  




// AUTOLOGIN
export function* autoLogin(action) {
    // console.log(action)
    const myId = localStorage.getItem("id"); // id mu ne treba, ali neka ga za svaki slucaj
    // console.log("in auto login")
    try {
        if (myId) {
            yield call(fetchProfileSaga, myId)
        }
    } catch (error) {
        // console.log(error)
        yield put({
            type: ActionsTypes.LOGIN_USER_FAILURE,
            payload: { message: "Check Your email and password!" }
        })
    }
}




// WATCHERS
export default function* root() {
    yield takeLatest(
        ActionsTypes.REGISTER_USER,
        register
    );

    yield takeEvery(
        ActionsTypes.AUTO_LOGIN,
        // 'AUTOLOGIN',
        autoLogin
    );

    yield takeEvery(
        ActionsTypes.LOGIN_USER,
        login
    );

    yield takeLatest(
        ActionsTypes.FETCH_COMPANY_BY_USER_ID,
        fetchSagaCompanyByProfileId
    );

}

