import React from "react";
import Nav from "../../components/Nav/Nav";
import "./Home.css";
import { Link } from "react-router-dom";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useSelector } from "react-redux";

const Home = () => {
  const topTenAlbums = useSelector((state) => state.savedAlbumsReducer);
  const topTenMovies = useSelector((state) => state.savedMoviesReducer);
  const topTenBooks = useSelector((state) => state.savedBooksReducer);

  // formats top ten lists into single shareable string
  const stringList = (albums, movies, books) => {
    const categories = [albums, movies, books];
    let topTenString = "";
    for (const category of categories) {
      if (category.length) {
        category.forEach((item, index) => {
          if (!index) {
            topTenString +=
              `My Top ${category.length} ${item.type}s:` +
              "\n" +
              `${index + 1}. ${item.name}` +
              "\n";
          } else if (index === category.length - 1)
            topTenString += `${index + 1}. ${item.name}` + "\n" + "\n";
          else {
            topTenString += `${index + 1}. ${item.name}` + "\n";
          }
        });
      }
    }
    return topTenString;
  };

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
            <FacebookShareButton
              url="google.com"
              quote={stringList(topTenAlbums, topTenMovies, topTenBooks)}
            >
              <FacebookIcon />
            </FacebookShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
