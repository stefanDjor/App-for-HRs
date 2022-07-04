
const initState = {
    loading: false,
    user: {
        username: '',
        email: '',
        password: '',
        role: '',
        company: '',
        profilePhoto: '',
        id: '',
        confirmed: false,
        isAutenticated: false,
    },
    profile: null,
    userCompany:null,
    registerFreshness: 0,
    error: {}
}

export default initState;