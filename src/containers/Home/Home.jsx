import React from "react";
import Nav from "../../components/Nav/Nav";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 header text-center">Top 10</div>
        </div>
        <div className="row">
          <h2 className="col-sm-12 text-center">
            A site to rank your favorite <Link className="link" to="/movies">Movies</Link>,{" "}
            <Link className="link" to="/albums">Albums</Link>, and <Link className="link" to="/books">Books</Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;