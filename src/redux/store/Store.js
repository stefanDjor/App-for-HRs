import reducer from "../reducer/Reducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../../saga/rootSaga";
import { createStore, applyMiddleware, compose, combineReducers } from "redux"



const sagaMiddleware = createSagaMiddleware()

const appReducer = combineReducers({
	reducer,
  });

  const rootReducer = (state, action) => {
	if (action.type === 'CLEAR_STORE') {
	  state = undefined;
	}
	return appReducer(state, action);
  };

// const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	withDevTools(applyMiddleware(...[sagaMiddleware]))
)

sagaMiddleware.run(rootSaga);

export default store;








// const store = createStore(
//     reducer, / preloadedState, /
//  +  window.__REDUX_DEVTOOLS_EXTENSION_ && window.__REDUX_DEVTOOLS_EXTENSION_()
//   );




