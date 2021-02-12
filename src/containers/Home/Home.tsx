import React from "react";
import Nav from "../../components/Nav/Nav";
import "./Home.css";
import { Link } from "react-router-dom";
import Socials from "../../components/Socials/Socials";

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
            A site to rank your favorite{" "}
            <Link className="link" to="/movies">
              Movies
            </Link>
            ,{" "}
            <Link className="link" to="/albums">
              Albums
            </Link>
            , and{" "}
            <Link className="link" to="/books">
              Books
            </Link>
          </h2>
        </div>
        <div className="row">
          <div className="col-sm-12 text-center">
            <h5 className="description">
              Craft your top tens and share to social media
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-center">
            <Socials/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
