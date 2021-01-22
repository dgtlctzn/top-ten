import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Movies from "./containers/Movies/Movies";
import Albums from "./containers/Albums/Albums";
import Home from "./containers/Home/Home";
import Books from "./containers/Books/Books";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/albums" component={Albums} />
        <Route exact path="/books" component={Books} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
