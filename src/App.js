import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Movies from "./containers/Movies/Movies";
import Albums from "./containers/Albums/Albums";
import Home from "./containers/Home/Home";
import { createStore, compose, applyMiddleware } from "redux";
import allReducers from "./reducers";
import { connect } from "react-redux";
// import { createBrowserHistory } from "history";
// import {
//   ConnectedRouter,
//   connectRouter,
//   routerMiddleware,
// } from "connected-react-router";

// const history = createBrowserHistory();

// const store = createStore(
//   allReducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   // compose(applyMiddleware(routerMiddleware(history)))
// );

function App() {
  return (
        <Router>
          <Switch>
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/albums" component={Albums} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
  );
}

export default App;
