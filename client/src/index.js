import React from "react";
import ReactDOM from "react-dom";
//redux is makin the new actions and changes in the components and statements
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";
/* import axios from 'axios';
window.axios = axios; */
//create store for central data storaging pass parameter of reducers we created and 3. parameter is redux thunk
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//apply store to provider thhat app can use the data
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
