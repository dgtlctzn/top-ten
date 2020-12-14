import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
// import { createStore, compose, applyMiddleware } from "redux";
// import allReducers from "./reducers";
// import { Provider } from "react-redux";
// import { createBrowserHistory } from "history";
// import {
//   ConnectedRouter,
//   connectRouter,
//   routerMiddleware,
// } from "connected-react-router";

// const history = createBrowserHistory();

// const store = createStore(
//   allReducers(history),
//   compose(
//     applyMiddleware(routerMiddleware(history))
//   )
// );

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}>
      <ConnectedRouter history={history}> */}
        <App />
      {/* </ConnectedRouter>
    </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
