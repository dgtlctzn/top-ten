import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearch,
  saveMovies,
  delMovie,
  searchMovies,
  sendMovieUp,
  sendMovieDown,
  successMessage,
  deleteMessage,
  warningMessage,
  searchStatus,
  noResultsMessage
} from "../../actions";
import Nav from "../../components/Nav/Nav";
import SearchBar from "../../components/SearchBar/SearchBar";
import API from "../../utils/API";
import Card from "../../components/Card/Card";
import Alert from "../../components/Alert/Alert"

const Movies = () => {
  // const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const savedMovies = useSelector((state) => state.savedMoviesReducer);
  const sortedMovies = savedMovies.sort((a, b) => a.index - b.index);

  const searchedMovies = useSelector((state) => state.movieReducer);
  const search = useSelector((state) => state.searchReducer);

  useEffect(() => {
    const savedAsString = JSON.stringify(savedMovies);
    for (const [key, value] of Object.entries(localStorage)) {
      if (!savedAsString.includes(key)) {
        const parsedVal = JSON.parse(value);
        if (parsedVal.type === "movie") {
          dispatch(
            saveMovies({
              name: key,
              image: parsedVal.image,
              info: parsedVal.info,
              index: parsedVal.index,
              type: parsedVal.type
            })
          );
        }
      }
    }
  }, []);

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value))
    // setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    dispatch(searchStatus(true))

    API.searchImdb(search)
    .then((searchRes) => {
      const movies = searchRes.data.results;
      const found = [];

      if (!movies.length) {
        dispatch(noResultsMessage(true, "movie"))
        dispatch(searchStatus(false));
        setTimeout(() => {
          dispatch(noResultsMessage(false))
        }, 2000);
        return;
      }
      for (let i = 0; i < 10; i++) {
        if (movies[i]) {
          const item = {
            name: movies[i].title ? movies[i].title : "No Movie Name",
            image: movies[i].image
              ? movies[i].image
              : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_497562.png&f=1&nofb=1",
            info: movies[i].description ? movies[i].description.replace(/[()]/g, "") : ""
          };
          found.push(item);
        }
      }
      dispatch(searchMovies(found));
      dispatch(searchStatus(false))

    })
    .catch((err) => {
      console.log(err);
      dispatch(searchStatus(false))
    });
  };

  const addMovie = (e) => {
    if (savedMovies.length === 10) {
      dispatch(warningMessage(true, "movie"))
      setTimeout(() => {
        dispatch(warningMessage(false))
      }, 2000);
      return;
    }
    const name = e.target.parentNode.name || e.target.name;
    const value = e.target.parentNode.value || e.target.value;

    const [image, info] = value.split(",");

    if (!localStorage.getItem(name)) {
      const data = JSON.stringify({
        index: savedMovies.length,
        image: image,
        info: info,
        type: "movie"
      });
      localStorage.setItem(name, data);
    }
    dispatch(
      saveMovies({
        name: name,
        image: image,
        info: info,
        index: savedMovies.length,
        type: "movie"
      })
    );
    dispatch(successMessage(true, "movie"))
    setTimeout(() => {
      dispatch(successMessage(false))
    }, 1500);
  };

  const deleteMovie = (e) => {
    const name = e.target.parentNode.name || e.target.name;
    dispatch(
      delMovie({
        name: name,
      })
    );
    let i = 0;
    for (const item of savedMovies) {
      localStorage.removeItem(item.name);
      if (item.name !== name) {
        localStorage.setItem(
          item.name,
          JSON.stringify({
            index: i,
            image: item.image,
            info: item.info,
            type: "movie"
          })
        );
        i++;
      }
    }
    dispatch(deleteMessage(true, "movie"))
    setTimeout(() => {
      dispatch(deleteMessage(false))
    }, 1500);
  };

  const sortStorage = (index, saved, increase = true) => {
    let change;
    increase ? (change = -1) : (change = 1);
    for (const item of saved) {
      let newIndex;
      if (item.index === index) {
        newIndex = index;
      } else if (item.index === index + change) {
        newIndex = index + change;
      } else {
        newIndex = item.index;
      }
      localStorage.removeItem(item.name);
      localStorage.setItem(
        item.name,
        JSON.stringify({
          index: newIndex,
          image: item.image,
          info: item.info,
          type: "movie"
        })
      );
    }
  };

  const handleMovieUp = (e) => {
    const name = e.target.parentNode.name || e.target.name;
    const index = parseInt(e.target.parentNode.value || e.target.value);
    if (index) {
      dispatch(sendMovieUp(name, index));
      sortStorage(index, savedMovies);
    }
  };

  const handleMovieDown = (e) => {
    const name = e.target.parentNode.name || e.target.name;
    const index = parseInt(e.target.parentNode.value || e.target.value);
    if (index !== savedMovies.length - 1) {
      dispatch(sendMovieDown(name, index));
      sortStorage(index, savedMovies, false);
    }
  };

  return (
    <>
      <Nav />
      <Alert/>
      <div className="container">
        <h1 className="text-center">Movies</h1>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <SearchBar
              handleSearchSubmit={handleSearchSubmit}
              handleSearchChange={handleSearchChange}
              search={search}
              page="Movies"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h2 className="text-center">Top Ten</h2>
            <ul>
              {sortedMovies.map((movie, index) => (
                <Card
                  key={`movie ${index + 1}`}
                  {...movie}
                  deleteItem={deleteMovie}
                  handleItemUp={handleMovieUp}
                  handleItemDown={handleMovieDown}
                  index={index}
                  page="movie"
                />
              ))}
            </ul>
          </div>
          <div className="col-sm-6">
            <h2 className="text-center">Search Results</h2>

            <ul>
              {searchedMovies.map((movie, index) => (
                <Card
                  key={`search result ${index + 1}`}
                  {...movie}
                  addItem={addMovie}
                  page="movie"
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
