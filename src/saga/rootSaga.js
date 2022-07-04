import { fork } from "redux-saga/effects";
import authSagas from "./authSagas";

// import watchUserAuthentication from "./watchers";
// import watchRequestCompany from "./watchers";

// export default function* startForman() {
// 	yield fork(watchUserAuthentication);
// }

// export function* startReciving() {
// 	yield fork(watchRequestCompany);
// }

export default function* rootSaga() {
    yield fork(authSagas)
}