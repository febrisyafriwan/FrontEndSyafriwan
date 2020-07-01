import * as React from 'react';
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Router from './src/rootRouters/index'
import rootReducer from "./src/rootReducers/index";
import rootSaga from "./src/rootSagas/index";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
        <Router/>
    </Provider>
  );
}
export default App;